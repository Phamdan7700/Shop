import { Storefront } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Breadcrumbs, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CartItem from "components/CartItem";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import ROUTE from "Helper/Router";
import { CartItemType } from "Helper/Types";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import { Store } from "utils/Store";
import styles from "../../styles/Cart.module.css";

function Cart() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        shoppingCart: { cart, countItem, totalPrice, shippingFee },
        userInfo,
    } = state;

    useEffect(() => {
        if (!userInfo) {
            router.push(ROUTE.signIn + "?redirect=/cart");
        }
    }, []);
    function handleAddToCart(item: CartItemType) {
        dispatch({
            type: "ADD_TO_CART",
            payload: { ...item, amount: 1 },
        });
    }
    function handleRemoveFromCart(item: CartItemType, amount: number) {
        dispatch({
            type: "REMOVE_TO_CART",
            payload: { ...item, amount: amount },
        });
    }

    return (
        <Layout>
            <Head>
                <title>Giỏ hàng</title>
            </Head>
            <Container sx={{ mt: 2 }}>
                <Breadcrumbs sx={{ pl: 2 }}>
                    <NextLink href={ROUTE.home} passHref>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang Chủ
                    </NextLink>
                    <NextLink href={ROUTE.cart} passHref>
                        <Storefront sx={{ mr: 0.5 }} fontSize="inherit" />
                        Giỏ hàng
                    </NextLink>
                </Breadcrumbs>
                <Grid container spacing={2} margin={0}>
                    <Grid item xs={12} md={8}>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{
                                    minWidth: "100%",
                                    maxWidth: "100%",
                                }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2} align="center">
                                            Product
                                        </TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Total</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {countItem === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ color: "text.secondary" }}>
                                                <AddShoppingCartIcon fontSize="large" />
                                                <br />
                                                Empty cart.
                                                <br />
                                                <NextLink href="/">Go To Shopping</NextLink>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        cart.map((item, index) => (
                                            <CartItem
                                                key={index}
                                                item={item}
                                                addToCart={handleAddToCart}
                                                removeFromCart={handleRemoveFromCart}
                                            />
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Stack spacing={1} className={styles.payment} justifyContent="space-between">
                                <div>
                                    <Typography variant="h6">Cart Totals</Typography>
                                    <Typography variant="body1">Tạm tính: {totalPrice}</Typography>
                                    <Typography variant="body1">Phí vận chuyển: {shippingFee}</Typography>
                                    <Typography variant="body1">Tổng Tiền: {totalPrice + shippingFee}</Typography>
                                </div>
                                <Button
                                    sx={{ width: "100%" }}
                                    disabled={countItem === 0}
                                    variant="contained"
                                    color="info"
                                    onClick={() => {
                                        router.push(ROUTE.checkOut);
                                    }}
                                >
                                    <LocalShippingIcon sx={{ marginRight: 1 }} /> Đặt Hàng
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default Cart;
