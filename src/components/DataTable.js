import React, {useState,useEffect} from 'react';
import  { DataGrid } from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { URL_API } from '../config';

const columns  = [
    {field : 'id', headerName : 'ID', width : 200},
    {field : 'name', headerName : 'Name', width : 300},
    {field : 'timezone', headerName : 'Timezone', width : 150},
    {field : 'lon', headerName : 'Longitude', width : 150},
    {field : 'lat', headerName : 'Latitude', width : 150},
    {
      field: "",
      headerName: "Actions",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <div>
          <IconButton  size="small">
            <EditIcon />
          </IconButton>
          <IconButton  size="small" >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    },
];

const DataTable = () => {
    const [tableData, setTableData] = useState([])
  
   useEffect(() => {
     fetch(URL_API)
      .then((data) => data.json())
      .then((data) => setTableData(data))
   });
  
    return (
      <div style={{ height: 500, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={tableData}
              columns={columns}
              pageSize={7}
              disableMultipleSelection = {true}
            />
          </div>
        </div>
      </div>
    )
  }

  export default DataTable;