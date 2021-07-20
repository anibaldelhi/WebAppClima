import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
 }

export default function MostrarMensaje (props) { 
    return(
        <Snackbar open={props.openMensaje} autoHideDuration={6000} onClose={props.cerrarMensaje} >
            <Alert severity={props.mensaje.tipo} onClose={props.cerrarMensaje}>
                {props.mensaje.descripcion}
            </Alert>
        </Snackbar>
    );
}