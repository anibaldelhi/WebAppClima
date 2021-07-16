import React, {Fragment} from 'react';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

export default function HomePage(){
    return (
        <Fragment>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Clima por Ciudades
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, id semper class orci pulvinar erat
                    lacinia cubilia, mauris cras fusce aenean tempus mus. Mauris cum ullamcorper hendrerit habitasse
                    bibendum velit orci, eget leo sociosqu donec iaculis pharetra ante ornare, aenean scelerisque 
                    placerat suspendisse tristique posuere. Cum posuere ac sem lobortis ullamcorper ridiculus mollis 
                    sapien sociosqu ultricies, eleifend eget nec sollicitudin maecenas felis facilisi senectus nibh, 
                    justo eros non aptent laoreet penatibus velit nunc inceptos.
                </Typography>
            </Container>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button component={Link} to="/list" variant="contained" color="primary">
                    Ver Clima de mi ciudad
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary">
                    Ver Inicio
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    )
}