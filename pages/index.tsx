import { Backdrop, CircularProgress, Container, Grid, Link, Typography } from "@mui/material";
import Slider from "components/Slider";
import Subscriber from "components/Subscriber";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import NextLink from "next/link";
import React, { useContext } from "react";
import { RingLoader } from "react-spinners";
import useSWR from "swr";
import { Store } from "utils/Store";
import CardProduct from "../components/CardProduct";
import { AddToCart, CartItemType, Product } from "../Helper/Types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Cart() {
    const URL = API.product;
    const { data, error } = useSWR(URL, fetcher);
    const { state, dispatch } = useContext(Store);

    const addToCart: AddToCart = (item) => {
        dispatch({ type: "ADD_TO_CART", payload: { ...item, amount: 1 } });
    };

    function removeFromCart(item: CartItemType) {}

    if (error) return <div>failed to load</div>;
    if (!data)
        return (
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
            >
               <RingLoader color="rgba(63, 209, 255, 1)" size={100}/>
            </Backdrop>
        );

    return (
        <>
            <Slider />
            <Container>
                <Typography variant="h2" textAlign="center" marginTop="20px">
                    Featured Products
                </Typography>
                <Grid container spacing={2}>
                    {data.map((item: Product) => (
                        <Grid key={item.id} item xs={6} md={3}>
                            <NextLink href={ROUTE.product(item.id)} passHref>
                                <Link underline="none">
                                    <CardProduct
                                        key={item.id}
                                        product={item}
                                        addToCart={addToCart}
                                    />
                                </Link>
                            </NextLink>
                        </Grid>
                    ))}
                </Grid>

                <Subscriber />
            </Container>
        </>
    );
}
