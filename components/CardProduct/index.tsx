import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CardActionArea } from "@mui/material";
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
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={product.image}
                    alt="product img"
                    sx={{ objectFit: "contain" }}
                />
                <CardContent>
                    <Typography
                        className={classes.title}
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {product.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        variant="outlined"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            handleClick();
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            style={{ marginRight: 5 }}
                        />
                        Add to Cart
                    </Button>
                    <Typography variant="h6" color="text.primary">
                        ${product.price}
                    </Typography>
                </Box>
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
