import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CardActionArea, Grow, Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { AddToCart, Product } from "Helper/Types";
import { useSnackbar } from "notistack";
import React from "react";
import styles from "./index.module.css";

interface CartProps {
    product: Product;
    addToCart: AddToCart;
}

export default function CardProduct({ product, addToCart }: CartProps) {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleClick = () => {
        enqueueSnackbar("Đã thêm vào giỏ hàng!", {
            variant: "success",
            autoHideDuration: 3000,
        });
    };

    return (
        <Card className={styles.card}>
            <span className={styles.label}>-5%</span>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={product.image}
                    alt="product img"
                    sx={{ objectFit: "contain" }}
                />
                <CardContent>
                    <Typography className={classes.title} gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" color="text.primary">
                            ${product.price}
                        </Typography>
                        <Rating sx={{ color: "red" }} value={product.rating.rate} readOnly />
                    </Stack>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            handleClick();
                        }}
                        sx={{ lineHeight: 1.5 }}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 5 }} />
                        <span className={styles.textBtn}>Thêm vào giỏ hàng</span>
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles({
    title: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
});
