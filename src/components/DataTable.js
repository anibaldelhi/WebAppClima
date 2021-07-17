import React, {useState,useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';

const columns = [
    {field : 'id', headerName : 'ID', width : 200},
    {field : 'name', headerName : 'Name', width : 300},
    {field : 'timezone', headerName : 'Timezone', width : 150},
    {field : 'lon', headerName : 'Longitude', width : 150},
    {field : 'lat', headerName : 'Latitude', width : 150}
];

const DataTable = () => {

    const [tableData, setTableData] = useState([])
  
   useEffect(() => {
     fetch("https://localhost:44338/api/clima")
      .then((data) => data.json())
      .then((data) => setTableData(data))
   });
  
    return (
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              title="Listado de ciudades" 
              rows={tableData}
              columns={columns}
              pageSize={20}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    )
  }

  export default DataTable;