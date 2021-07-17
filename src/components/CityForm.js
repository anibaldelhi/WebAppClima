import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { WEATHER_KEY, URL_CLIMA, URL_API } from '../config';

const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));

export default function CityForm() {
  const classes = useStyles();

  const [openAdd, setOpenAdd] = useState(false);
  const [openMensaje, setOpenMensaje] = useState(false);
  const [ciudad, setCiudad] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenMensaje = (tipo = 'error',valor = 'Error general') => {
    setTipoMensaje(tipo);
    setMensaje(valor);
    setOpenMensaje(true);
  };


  const handleCloseMensaje = () => {
    setOpenMensaje(false);
  };

  const handleAgregar = async (e) => {
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
            handleOpenMensaje('success','Se ha guardado exitosamente la ciudad.');
            setOpenAdd(false);
          })
          .catch(function (error) {
            // handle error
            if(!error.response)
              handleOpenMensaje('error','Error de comunicación con el backend.');
            else if(error.response?.status === 400)
              handleOpenMensaje('error','Ciudad ya existe.');
            else
              handleOpenMensaje('error','Error al guardar.');
          })
        })
        .catch(function (error) {
          // handle error
          if(error.response?.status === 404)
            handleOpenMensaje('warning','No se encontró ciudad.');
          else
            handleOpenMensaje('warning','Error al consultar clima de la ciudad.');
        })

    }
    else{
      handleOpenMensaje('warning', 'Debe detallar la ciudad');
    }
    setCiudad('');
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div>
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.absolute} onClick={handleOpenAdd}>
            <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-title">
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
          <Button onClick={handleCloseAdd} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAgregar} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openMensaje} autoHideDuration={6000} onClose={handleCloseMensaje}>
        <Alert onClose={handleCloseMensaje} severity={tipoMensaje}>
          {mensaje}
        </Alert>
      </Snackbar>

    </div>
  );
}