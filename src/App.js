import Routes from './routes/Routes';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './themes/ThemeConfig';

export default function App() {
    return(
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    );
}