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
import { WEATHER_KEY } from '../keys';

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

  const [open, setOpen] = useState(false);
  const [ciudad, setCiudad] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgregar = async (e) => {
    e.preventDefault();

    setOpen(false);
    const cityValue = ciudad;
    setCiudad('');

    if (cityValue) {
        // metric parameter is for Celcius Unit
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},&appid=${WEATHER_KEY}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data)

        const city = {
            "id": data.id,
            "name": data.name,
            "timezone" : data.timezone,
            "lat" : data.coord.lat,
            "lon" : data.coord.lon
        };

        console.log(city)

        axios.post(`https://localhost:44338/api/clima`, city )
        .then(res => {
            console.log(res);
            console.log(res.data);
        })

    }

  };

  return (
    <div>
      <Tooltip title="Add" aria-label="add">
        <Fab color="secondary" className={classes.absolute} onClick={handleClickOpen}>
            <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAgregar} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}