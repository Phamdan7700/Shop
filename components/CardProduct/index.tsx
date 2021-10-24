import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Skeleton } from '@mui/material';
import Product from '../../Helper/PropTypes';

type CartProps = Omit<Product, 'id'>;
export default function CardProduct(props: CartProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height=""
                    image={props.image}
                    alt="product img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Button variant="outlined">Add to Cart</Button>
                <Typography variant="button" color="text.secondary">
                    {props.price} $
                </Typography>
            </CardContent>

        </Card>
    )

}
