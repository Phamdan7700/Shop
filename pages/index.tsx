import { Button, Container, Divider, Grid, Link, Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box, height } from "@mui/system";
import Banner from "components/Banner";
import BannerSale from "components/BannerSale";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import Loading from "components/Loading";
import Slider from "components/Slider";
import SliderProduct from "components/SliderProduct";
import Subscriber from "components/Subscriber";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import React, { useContext } from "react";
import useSWR from "swr";
import { Store } from "utils/Store";
import CardProduct from "../components/CardProduct";
import { AddToCart, Product } from "../Helper/Types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function Cart() {
    const URL = API.product;
    const { data, error } = useSWR(URL, fetcher);
    const { state, dispatch } = useContext(Store);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const addToCart: AddToCart = (item) => {
        dispatch({ type: "ADD_TO_CART", payload: { ...item, amount: 1 } });
    };

    if (error) return <div>failed to load</div>;
    if (!data) return <Loading />;

    return (
        <Layout>
            <Slider />
            <Container sx={{ pb: 5 }}>
                <Banner />
                <div>
                    <Typography variant="h2" textAlign="center" margin="20px 0">
                        Featured Products
                    </Typography>

                    <Box sx={{ width: "100%" }}>
                        <Box >
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Item One" {...a11yProps(0)} />
                                <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Grid container spacing={2} pb={5}>
                                {data.map((item: Product) => (
                                    <Grid key={item.id} item xs={6} md={3}>
                                        <NextLink href={ROUTE.getProduct(item.id)}>
                                            <CardProduct key={item.id} product={item} addToCart={addToCart} />
                                        </NextLink>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Grid container spacing={2} pb={5}>
                                {data.map((item: Product) => (
                                    <Grid key={item.id} item xs={6} md={3}>
                                        <NextLink href={ROUTE.getProduct(item.id)}>
                                            <CardProduct key={item.id} product={item} addToCart={addToCart} />
                                        </NextLink>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            1231321313
                        </TabPanel>
                    </Box>
                </div>
                <Divider />
            </Container>
            <BannerSale />
            <Container sx={{ pt: 5, pb: 5 }}>
                <Divider />
                <SliderProduct>
                    {data.map((item: Product) => (
                        <Box key={item.id} sx={{ p: "0 10px" }}>
                            <NextLink href={ROUTE.getProduct(item.id)}>
                                <CardProduct key={item.id} product={item} addToCart={addToCart} />
                            </NextLink>
                        </Box>
                    ))}
                </SliderProduct>
            </Container>
            <Subscriber />
        </Layout>
    );
}
