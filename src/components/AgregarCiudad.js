import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { URL_API, WEATHER_KEY, URL_CLIMA } from '../config';
import MostrarMensaje from './MostrarMensaje';

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


export default function AgregarCiudad (props) {
    const classes = useStyles();

    const [modalAgregar, setModalAgregar]=useState(false);
    const [ciudad, setCiudad] = useState('');

    const abrirCerrarModalAgregar=()=>{
        setModalAgregar(!modalAgregar);
    }

    const peticionPost = async () => {
        if (ciudad) {
            const URL = `${URL_CLIMA}?q=${ciudad},&appid=${WEATHER_KEY}`;
            axios.get(URL)
            .then(function (o) {
              axios.post(URL_API, o.data )
              .then(function (response) {
                props.abrirMensaje('success','Se ha guardado exitosamente la ciudad.');
                props.peticionGet();
                abrirCerrarModalAgregar();
              })
              .catch(function (error) {
                if(!error.response)
                  props.abrirMensaje('error','Error de comunicación con el backend.');
                else if(error.response?.status === 400)
                  props.abrirMensaje('error','Ciudad ya existe.');
                else
                  props.abrirMensaje('error','Error al guardar.');
              })
            })
            .catch(function (error) {
            if(error.response?.status === 404)
              props.abrirMensaje('warning','No se encontró ciudad.');
            else
              props.abrirMensaje('warning','Error al consultar clima de la ciudad.');
            })
        }
        else{
          props.abrirMensaje('warning', 'Debe detallar la ciudad');
        }
        setCiudad('');
      };

    return(   
    <div>  
        <Tooltip title="Add" aria-label="add">
            <Fab color="primary" className={classes.absolute} onClick={abrirCerrarModalAgregar}>
                <AddIcon />
            </Fab>
        </Tooltip>
        <Dialog open={modalAgregar} onClose={abrirCerrarModalAgregar} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Ciudades</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Favor agregar el nombre de la nueva ciudad.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="txtCiudad" label="Ciudad" type="text" value = {ciudad} 
              onChange={(e) => setCiudad(e.target.value)} fullWidth  />
          </DialogContent>
          <DialogActions>
            <Button onClick={peticionPost} variant="contained" color="primary">
              Agregar
            </Button>
            <Button onClick={abrirCerrarModalAgregar} variant="contained" color="secondary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
        <MostrarMensaje mensaje = {props.mensaje} openMensaje = {props.openMensaje} 
        cerrarMensaje={ props.cerrarMensaje}/>
      </div>
    )
}