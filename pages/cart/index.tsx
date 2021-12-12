import { Storefront } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Breadcrumbs, Button, Chip, Container, Grid, Stack, Typography } from "@mui/material";
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
import { formatNumber } from "Helper/function";
import ROUTE from "Helper/Router";
import { CartItemType } from "Helper/Types";
import Cookies from "js-cookie";
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
    } = state;
    const [userInfo, setUserInfo] = React.useState(() => {
        return Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")!) : null;
    });
    const auth_token = Cookies.get("auth_token") ? JSON.parse(Cookies.get("auth_token")!) : null
    useEffect(() => {
        if (!userInfo || !auth_token) {
            router.push(ROUTE.signIn + "?redirect=" + ROUTE.cart);
        }
    });
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
                <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
                    <Breadcrumbs sx={{ pl: 2, mb: 3 }}>
                        <Chip
                            color="info"
                            component={NextLink}
                            label="Trang Chủ"
                            icon={<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                            href={ROUTE.home}
                            clickable
                        />
                        <Chip label="Giỏ hàng" />
                    </Breadcrumbs>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
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
                                                Sản phẩm
                                            </TableCell>
                                            <TableCell align="center">Giá</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Tổng tiền</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {countItem === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ color: "text.secondary" }}>
                                                    <AddShoppingCartIcon fontSize="large" />
                                                    <br />
                                                    Giỏ hàng trống.
                                                    <br />
                                                    <NextLink href="/">Tiếp tục mua hàng</NextLink>
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
                        <Grid item xs={12} md={3}>
                            <Paper>
                                <Stack spacing={1} className={styles.payment} justifyContent="space-between">
                                    <div>
                                        <Typography sx={{ mt: 1, mb: 1 }} variant="h6">
                                            Giỏ hàng
                                        </Typography>
                                        <Typography sx={{ mt: 1, mb: 1 }} variant="body1">
                                            Tạm tính: {formatNumber(totalPrice)} <span>đ</span>
                                        </Typography>
                                        <Typography sx={{ mt: 1, mb: 1 }} variant="body1">
                                            Phí vận chuyển: {formatNumber(shippingFee)} <span>đ</span>
                                        </Typography>
                                        <Typography sx={{ mt: 1, mb: 1 }} variant="body1">
                                            TỔNG TIỀN: {formatNumber(totalPrice + shippingFee)} <span>đ</span>
                                        </Typography>
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
                </Paper>
            </Container>
        </Layout>
    );
}

export default Cart;
