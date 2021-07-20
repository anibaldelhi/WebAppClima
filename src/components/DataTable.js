import React, {useState,useEffect} from 'react';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button} from '@material-ui/core';
import axios from 'axios';
import {Edit, Delete} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';

import AgregarCiudad from './AgregarCiudad';
import ModificarCiudad from './ModificarCiudad';


import { URL_API } from '../config';

export default function DataTable () {

  const [data, setData]=useState([]);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [ciudadSeleccionada, setCiudadSeleccionada]=useState({
    id: '',
    name:'',
    timezone: 0,
    coord:{
      lon : 0,
      lat : 0
    },
    weather: []
  })

  const [openMensaje, setOpenMensaje] = useState(false);

  const [mensaje, setMensaje]=useState({
      tipo: '',
      descripcion: ''
  })

const cerrarMensaje=()=>{
     setOpenMensaje(false);
}

const abrirMensaje = (_tipo = "info", _descripcion = "Mensaje por defecto.") => {
    setMensaje({
      tipo : _tipo,
      descripcion : _descripcion
    })
    setOpenMensaje(true);
  };

  const peticionGet=async()=>{
    await axios.get(URL_API)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(URL_API +"/" + ciudadSeleccionada.id)
    .then(response=>{
      setData(data.filter(ciudad=>ciudad.id!==ciudadSeleccionada.id));
      abrirCerrarModalEliminar();
    })
  }

  useEffect(()=>{
    peticionGet();
  },[data]);

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarCiudad=(ciudad, caso)=>{
    setCiudadSeleccionada(ciudad);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  const bodyEliminar=(
    <div>
      <Dialog open={modalEliminar} onClose={abrirCerrarModalEliminar}  aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Eliminar ciudad seleccionada"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar la ciudad seleccionada: {ciudadSeleccionada?.nombre} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={peticionDelete} variant="contained" color="primary">
            Eliminar
          </Button>
          <Button onClick={abrirCerrarModalEliminar} variant="contained" color="secondary">
            Cancelar
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
               <TableCell>{ciudad.coord.lon}</TableCell>
               <TableCell>{ciudad.coord.lat}</TableCell>
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

     {bodyEliminar}

     <AgregarCiudad mensaje = {mensaje} openMensaje = {openMensaje} cerrarMensaje={cerrarMensaje}
     abrirMensaje = {abrirMensaje} peticionGet = {peticionGet}/>

     <ModificarCiudad  mensaje = {mensaje} openMensaje = {openMensaje} abrirMensaje = {abrirMensaje} 
     cerrarMensaje={cerrarMensaje}  modalEditar={modalEditar} abrirCerrarModalEditar={abrirCerrarModalEditar} 
     ciudadSeleccionada={ciudadSeleccionada} setCiudadSeleccionada={setCiudadSeleccionada} />

     </div>
  );
}


    