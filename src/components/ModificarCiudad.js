import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField} from '@material-ui/core';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

import { URL_API } from '../config';
import MostrarMensaje from './MostrarMensaje';

export default function ModificarCiudad (props) {

  const peticionPut=async()=>{
    await axios.put(URL_API+"/"+props.ciudadSeleccionada.id, props.ciudadSeleccionada)
    .then(function (obj) {
      props.abrirCerrarModalEditar();
      props.abrirMensaje('success','Los cambios se han guardado exitosamente.');
    })
    .catch(function (error) {
      if(!error.response)
        props.abrirMensaje('error','Error de comunicación con el backend.');
      else
        props.abrirMensaje('error','Error al guardar.');
    })
  }
  
  const handleChange=e=>{
    props.setCiudadSeleccionada(prevState=>({
      ...prevState,
      [e.target.name] : parseFloat(e.target.value),
    }))
  }

  const handleChangeCoord=e=>{
    const {name, value}=e.target;
    props.setCiudadSeleccionada(prevState=>({
      ...prevState,
      coord:{
        ...prevState.coord,
        [name]: parseFloat(value)
      }
    }))
  }

  return(
    <div>
      <Dialog open={ props.modalEditar} onClose={props.abrirCerrarModalEditar}>
        <DialogTitle id="form-dialog-title">Editar Ciudad {props.ciudadSeleccionada?.name}</DialogTitle>
        <DialogContent>
          <TextField type="number" fullWidth name="id" label="ID" 
          value = {props.ciudadSeleccionada?.id} InputProps={{readOnly: true,}}/>
          <TextField type="text" fullWidth name="id" label="ID" 
          value = {props.ciudadSeleccionada?.name} InputProps={{readOnly: true,}}/>
          <TextField required type="number" fullWidth name="timezone" label="Timezone"
           onChange={handleChange} value = {props.ciudadSeleccionada?.timezone}/>
          <TextField required type="number" fullWidth name="lon" label="Longitude" 
          onChange={handleChangeCoord} value = {props.ciudadSeleccionada?.coord.lon}/>
          <TextField required type="number" fullWidth name="lat" label="Latitude" 
          onChange={handleChangeCoord} value = {props.ciudadSeleccionada?.coord.lat}/>
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
                {props.ciudadSeleccionada.weather.map( data =>(
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.main}</TableCell>
                    <TableCell>{data.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained"  onClick={()=>peticionPut()}>Guardar</Button>
          <Button color="secondary" variant="contained"  onClick={()=>props.abrirCerrarModalEditar()}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <MostrarMensaje mensaje = {props.mensaje} openMensaje = {props.openMensaje} 
        cerrarMensaje={ props.cerrarMensaje}/>
    </div>
  )
}