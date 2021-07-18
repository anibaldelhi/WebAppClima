import React from 'react';
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
  }));

export default function Navbar(){
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Clima
                    </Typography>
                    <Button  component={Link} to="/" color="inherit" className={classes.link}>
                        Inicio
                    </Button >
                    <Button component={Link} to="/list" variant="button" color="inherit" className={classes.link}>
                        Datos hidrometereológicos
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}