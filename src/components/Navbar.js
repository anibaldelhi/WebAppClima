import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import CloudIcon from '@material-ui/icons/Cloud';

export default function Navbar(){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Clima
                    </Typography>
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                        <MenuItem component={Link} to="/" color="inherit">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <Typography variant="inherit">Inicio</Typography>
                        </MenuItem>
                        <MenuItem component={Link} to="/list" color="inherit">
                            <ListItemIcon>
                                <CloudIcon />
                            </ListItemIcon>
                            <Typography variant="inherit">Datos hidrometeorológicos</Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}