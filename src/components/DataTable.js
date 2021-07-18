import React, {useState,useEffect} from 'react';
import {Table, Divider, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField, Typography} from '@material-ui/core';
import axios from 'axios';
import {Edit, Delete} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { URL_API, WEATHER_KEY, URL_CLIMA } from '../config';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function DataTable () {

  const classes = useStyles();

  const [data, setData]=useState([]);
  const [modalAgregar, setModalAgregar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [openMensaje, setOpenMensaje] = useState(false);
  const [ciudad, setCiudad] = useState('');

  const [ciudadSeleccionada, setCiudadSeleccionada]=useState({
    id: '',
    name:'',
    timezone: 0,
    lon: 0,
    lat: 0,
    weather: []
  })

  const [mensaje, setMensaje]=useState({
    tipo: '',
    descripcion: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setCiudadSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(e);
  }

  const peticionGet=async()=>{
    await axios.get(URL_API)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPut=async()=>{
    await axios.put(URL_API+"/"+ciudadSeleccionada.id, ciudadSeleccionada)
    .then(function (obj) {
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(URL_API +"/" + ciudadSeleccionada.id)
    .then(response=>{
      setData(data.filter(ciudad=>ciudad.id!==ciudadSeleccionada.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalAgregar=()=>{
    setModalAgregar(!modalAgregar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const abrirMensaje = (_tipo = "info", _descripcion = "Mensaje por defecto.") => {
    setMensaje({
      tipo : _tipo,
      descripcion : _descripcion
    })
    setOpenMensaje(true);
  };

  const cerrarMensaje=()=>{
    setOpenMensaje(false);
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const seleccionarCiudad=(ciudad, caso)=>{
    setCiudadSeleccionada(ciudad);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[]);

  const bodyEditar=(
    <div>
      <Dialog open={modalEditar} onClose={abrirCerrarModalEditar}>
        <Container>
          <Typography variant='h4'>Editar Ciudad</Typography>
          <Divider />
          <TextField type="number" fullWidth name="id" label="ID" onChange={handleChange} value = {ciudadSeleccionada?.id} InputProps={{readOnly: true,}}/>
          <TextField type="text" fullWidth name="name" label="Name" onChange={handleChange} value = {ciudadSeleccionada?.name} InputProps={{readOnly: true,}}/>
          <TextField required type="number" fullWidth name="timezone" label="Timezone" onChange={handleChange} value = {ciudadSeleccionada?.timezone}/>
          <TextField required type="number" fullWidth name="lon" label="Longitude" onChange={handleChange} value = {ciudadSeleccionada?.lon}/>
          <TextField required type="number" fullWidth name="lat" label="Latitude" onChange={handleChange} value = {ciudadSeleccionada?.lat}/>
          <Divider/>
          <TableContainer component={Paper}>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>ID</TableCell>
             <TableCell>Main</TableCell>
             <TableCell>Description</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {ciudadSeleccionada.weather.map( data =>(
             <TableRow key={data.id}>
               <TableCell>{data.id}</TableCell>
               <TableCell>{data.main}</TableCell>
               <TableCell>{data.description}</TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
          <div align="right">
            <Button color="primary" onClick={()=>peticionPut()}>Guardar</Button>
            <Button color="secondary" onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </Container>
      </Dialog>
    </div>
  )
  const bodyEliminar=(
    <div>
      <Dialog
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar ciudad seleccionada"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar la ciudad seleccionada: {ciudadSeleccionada?.nombre} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={peticionDelete} color="primary">
            Eliminar
          </Button>
          <Button onClick={abrirCerrarModalEliminar} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

  const MensajeAlerta = ( 
    <Snackbar open={openMensaje} autoHideDuration={6000} onClose={cerrarMensaje} >
    <Alert severity={mensaje.tipo} onClose={cerrarMensaje}>
      {mensaje.descripcion}
    </Alert>
  </Snackbar>
  )

  const peticionAgregar = async (e) => {
    e.preventDefault();

    if (ciudad) {
        // metric parameter is for Celcius Unit
        const URL = `${URL_CLIMA}?q=${ciudad},&appid=${WEATHER_KEY}`;
        axios.get(URL)
        .then(function (o) {
          // handle success
          console.log(o);
            const city = {
              "id": o.data.id,
              "name": o.data.name,
              "timezone" : o.data.timezone,
              "lat" : o.data.coord.lat,
              "lon" : o.data.coord.lon,
              "weather" : o.data.weather
          };
          
          axios.post(URL_API, city )
          .then(function (response) {
            // handle success
            abrirMensaje('success','Se ha guardado exitosamente la ciudad.');
          })
          .catch(function (error) {
            // handle error
            if(!error.response)
            abrirMensaje('error','Error de comunicación con el backend.');
            else if(error.response?.status === 400)
            abrirMensaje('error','Ciudad ya existe.');
            else
            abrirMensaje('error','Error al guardar.');
          })
        })
        .catch(function (error) {
          // handle error
          if(error.response?.status === 404)
          abrirMensaje('warning','No se encontró ciudad.');
          else
          abrirMensaje('warning','Error al consultar clima de la ciudad.');
        })

    }
    else{
      abrirMensaje('warning', 'Debe detallar la ciudad');
    }
    setCiudad('');
  };

  const bodyAgregar = (
    <div>
      <Dialog open={modalAgregar} onClose={abrirCerrarModalAgregar} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ciudades</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Favor agregar el nombre de la nueva ciudad.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="txtCiudad"
            label="Ciudad"
            type="text"
            value = {ciudad} 
            onChange={(e) => setCiudad(e.target.value)} 
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={abrirCerrarModalAgregar} color="primary">
            Cancelar
          </Button>
          <Button onClick={peticionAgregar} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )

  return (
    <div className="App">
     <TableContainer component={Paper}>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>ID</TableCell>
             <TableCell>Name</TableCell>
             <TableCell>Timezone</TableCell>
             <TableCell>Longitude</TableCell>
             <TableCell>Latitude</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {data.map(ciudad=>(
             <TableRow key={ciudad.id}>
               <TableCell>{ciudad.id}</TableCell>
               <TableCell>{ciudad.name}</TableCell>
               <TableCell>{ciudad.timezone}</TableCell>
               <TableCell>{ciudad.lon}</TableCell>
               <TableCell>{ciudad.lat}</TableCell>
               <TableCell>
                 <Edit onClick={()=>seleccionarCiudad(ciudad, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete onClick={()=>seleccionarCiudad(ciudad, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>

     {bodyEditar}

     {bodyEliminar}

     {bodyAgregar}

     {MensajeAlerta}
     
     <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.absolute} onClick={abrirCerrarModalAgregar}>
            <AddIcon />
        </Fab>
      </Tooltip>
    </div>

  );
}


    