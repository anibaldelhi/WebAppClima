import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default function ErrorPage(){
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        Página no encontrada :(
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lo sentimos, la página que intentas solicitar no fue encontrada.
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button component={Link} to="/" size="small" color="primary">
                    Ir a inicio
                </Button>
            </CardActions>
        </Card>
    )
}