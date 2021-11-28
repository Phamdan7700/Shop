import { Container, Divider } from "@mui/material";
import { Box } from "@mui/system";
import Banner from "components/Banner";
import BannerSale from "components/CustomSlider";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import Loading from "components/Loading";
import ProductList from "components/ProductList";
import Slider from "components/Slider";
import SliderProduct from "components/SliderProduct";
import Subscriber from "components/Subscriber";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import React, { useContext } from "react";
import useSWR from "swr";
import { Store } from "utils/Store";
import CardProduct from "../components/CardProduct";
import { AddToCart, Category, Product } from "../Helper/Types";
import Head from 'next/head'
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const slider = [{ src: "banner1.jpg" }, { src: "banner2.jpg" }, { src: "banner3.jpg" }];

export default function Home() {
    const URL = API.homepage;
    const { data, error } = useSWR(URL, fetcher);
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const addToCart: AddToCart = (item) => {
        dispatch({ type: "ADD_TO_CART", payload: { ...item, amount: 1 } });
    };

    if (error) return <div>failed to load</div>;
    if (!data)
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    const { sliderList, categoryList, productList } = data;
    console.log(data);
    return (
        <Layout>
            <Head>
                <title>Trang chủ</title>
            </Head>
            {/* Slider */}
            <Slider sliders={sliderList} />
            {/* Banner */}
            <Divider sx={{ mt: 2, mb: 2, visibility: "hidden" }} />
            <Container>
                <Banner />
            </Container>
            <Divider sx={{ mt: 3, mb: 3, visibility: "hidden" }} />
            {/* Laptop */}
            {categoryList.map((category:Category, index:number) => {
                return (
                    <div key={index} className={`wrapper-banner-${index}`}>
                        <Container sx={{ pt: 5, pb: 5 }}>
                            <SliderProduct title={`${category.title} nổi bật`}>
                                {category.products.map((item: Product) => (
                                    <div key={item.id} style={{ padding: "0 10px", height: "100%" }}>
                                        <NextLink href={ROUTE.getProduct(item.id)}>
                                            <CardProduct key={item.id} product={item} />
                                        </NextLink>
                                    </div>
                                ))}
                            </SliderProduct>
                        </Container>
                    </div>
                );
            })}

            <Divider sx={{ mt: 2, mb: 2, visibility: "hidden" }} />
            {/* Sale */}
            <Container>
                <BannerSale slider={slider} />
            </Container>
            <Divider sx={{ mt: 2, mb: 2, visibility: "hidden" }} />
            {/* Product list */}
            <Container sx={{ pt: 2, pb: 2 }}>
                <ProductList/>
            </Container>
            <Divider sx={{ mt: 2, mb: 2, visibility: "hidden" }} />
           
        </Layout>
    );
}
