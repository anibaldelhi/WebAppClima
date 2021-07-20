import DataTable from "../components/DataTable";
import Typography from '@material-ui/core/Typography';

export default function ListPage(){
    return (
        <div>
            <Typography variant="h4" gutterBottom>Datos hidrometeorológicos</Typography>
            <DataTable />
            
        </div>
    )
}