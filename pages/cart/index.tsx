import { Container, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CartItem from "components/CartItem";
import { CartItemType } from "Helper/Types";
import * as React from "react";
import { useContext } from "react";
import { Store } from "utils/Store";
import NextLink from "next/link";

function Cart() {
    const { state, dispatch } = useContext(Store);
    const { cart, countItem } = state;

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
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
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
                                {cart.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{color: 'text.secondary'}}>
                                            Empty cart. <br />
                                            <NextLink href="/">
                                                Go To Shopping
                                            </NextLink>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cart.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            addToCart={handleAddToCart}
                                            removeFromCart={
                                                handleRemoveFromCart
                                            }
                                        />
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={5}>
                    <h3>Cart Totals</h3>
                    <p>{state.totalPrice}</p>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Cart;
