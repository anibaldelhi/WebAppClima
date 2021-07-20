import {Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import { URL_API } from '../config';

export default function EliminarCiudad (props) {
    const peticionDelete=async()=>{
        await axios.delete(URL_API +"/" + props.ciudadSeleccionada.id)
        .then(response=>{
          props.setData(props.data.filter(ciudad=>ciudad.id!==props.ciudadSeleccionada.id));    
          props.abrirCerrarModalEliminar();
          props.abrirMensaje('success','Se ha eliminado la ciudad exitosamente.');
        })
        .catch(function (error) {
            if(!error.response)
              props.abrirMensaje('error','Error de comunicación con el backend.');
            else
              props.abrirMensaje('error','Error al eliminar.');
        })
    }

    return(
        <div>
        <Dialog open={props.modalEliminar} onClose={props.abrirCerrarModalEliminar}  aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Eliminar ciudad seleccionada"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                ¿Está seguro(a) que desea eliminar la ciudad seleccionada: {props.ciudadSeleccionada?.nombre} ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={peticionDelete} variant="contained" color="primary">
                Eliminar
            </Button>
            <Button onClick={props.abrirCerrarModalEliminar} variant="contained" color="secondary">
                Cancelar
            </Button>
            </DialogActions>
        </Dialog>
        </div>
  )
}
