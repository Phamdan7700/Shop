import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CardActionArea, Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { AddToCart, Product } from "Helper/Types";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { Store } from "utils/Store";
import { useRouter } from "next/router";
import ROUTE from "Helper/Router";
import { formatNumber } from "Helper/function";
import Cookies from "js-cookie";

interface CartProps {
    product: Product;
}

export default function CardProduct({ product }: CartProps) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(Store);
    const userInfo = Cookies.get("userInfo");
    const router = useRouter();
    const handleClick = () => {
        enqueueSnackbar("Đã thêm vào giỏ hàng!", {
            variant: "success",
            autoHideDuration: 3000,
        });
    };

    const addToCart: AddToCart = (item) => {
        dispatch({ type: "ADD_TO_CART", payload: { ...item, amount: 1 } });
    };

    const handleAddToCart = () => {
        if (!userInfo) {
            router.push(ROUTE.signIn);
            return;
        }
        addToCart(product);
        handleClick();
    };

    return (
        <Card className={styles.card}>
            {product.price_sale > 0 && (
                <div className={`${styles.label} animate__animated animate__swing animate__infinite `}>
                    <Image src="/img/label-sale.png" layout="fill" alt="" objectFit="contain" />
                </div>
            )}
            <CardActionArea className={styles.borderLogo}>
                <CardMedia
                    className={styles.cardMedia}
                    component="img"
                    height="250"
                    image={product.thumbnail}
                    alt="product img"
                />
            </CardActionArea>
            <CardContent className={styles.cardContent}>
                <Stack justifyContent="space-between" spacing={1} height="100%">
                    <Typography className={styles.title} gutterBottom variant="body1" component="p">
                        {product.name}
                    </Typography>

                    <div>
                        <Stack>
                            {product.price_sale > 0 && (
                                <div className={styles.priceOld}>
                                    {formatNumber(product.price)} <small>đ</small>
                                </div>
                            )}
                            <Typography variant="h6" component="span" fontWeight="bold">
                                {formatNumber(product.price_sale ? product.price_sale : product.price)} <small>đ</small>
                            </Typography>
                        </Stack>
                        <div className={styles.rating}>
                            <Rating sx={{ color: "red" }} value={product.rating.rate} readOnly />
                            <span className={styles.ratingCount}>{product.rating.count}</span>
                        </div>

                        <Button
                            className={styles.addtocart}
                            variant="outlined"
                            fullWidth={true}
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart();
                            }}
                            sx={{ lineHeight: 1.5 }}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 5 }} />
                            <span>Thêm vào giỏ hàng</span>
                        </Button>
                    </div>
                </Stack>
            </CardContent>
        </Card>
    );
}
