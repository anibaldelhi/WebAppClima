import React, {useState,useEffect} from 'react';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';
import axios from 'axios';
import {Edit, Delete} from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import AgregarCiudad from './AgregarCiudad';
import ModificarCiudad from './ModificarCiudad';
import EliminarCiudad from './EliminarCiudad';

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

    <AgregarCiudad mensaje = {mensaje} openMensaje = {openMensaje} cerrarMensaje={cerrarMensaje}
     abrirMensaje = {abrirMensaje} peticionGet = {peticionGet}/>

    <ModificarCiudad  mensaje = {mensaje} openMensaje = {openMensaje} abrirMensaje = {abrirMensaje} 
     cerrarMensaje={cerrarMensaje}  modalEditar={modalEditar} abrirCerrarModalEditar={abrirCerrarModalEditar} 
     ciudadSeleccionada={ciudadSeleccionada} setCiudadSeleccionada={setCiudadSeleccionada} />

    <EliminarCiudad  mensaje = {mensaje} openMensaje = {openMensaje} abrirMensaje = {abrirMensaje} 
     cerrarMensaje={cerrarMensaje}  modalEliminar={modalEliminar} abrirCerrarModalEliminar={abrirCerrarModalEliminar} 
     ciudadSeleccionada={ciudadSeleccionada} data={data} setData={setData} />

     </div>
  );
}


    