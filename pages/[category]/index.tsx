import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Container, Grid, Pagination, PaginationItem } from "@mui/material";
import CardProduct from "components/CardProduct";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import { Product } from "Helper/Types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import LaptopIcon from "@mui/icons-material/Laptop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WatchIcon from "@mui/icons-material/Watch";
import { useRouter } from "next/router";
import Link from "components/Link";

export default function Products({ dataApi }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {
        data,
        meta: { current_page, last_page },
    } = dataApi as dataApi;
    const router = useRouter();
    const { category } = router.query;
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(`${category}?page=${value}`);
    };
    function capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Layout>
            <Head>
                <title>{capitalizeFirstLetter(data[0].category as string)}</title>
            </Head>
            <Container sx={{ mt: 2, mb:5 }}>
                <Breadcrumbs sx={{ pl: 2 }}>
                    <NextLink href={ROUTE.home} passHref>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang Chủ
                    </NextLink>
                    <span>{capitalizeFirstLetter(data[0].category as string)}</span>
                </Breadcrumbs>
                <Grid container spacing={2} pb={5} margin={0}>
                    {data.map((item: Product) => (
                        <Grid key={item.id} item xs={6} md={3}>
                            <NextLink href={ROUTE.getProduct(item.id)}>
                                <CardProduct key={item.id} product={item} />
                            </NextLink>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                    count={last_page}
                    color="primary"
                    page={current_page}
                    variant="outlined"
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            href={`/${category}${item.page === 1 ? "" : `?page=${item.page}`}`}
                            {...item}
                        />
                    )}
                />
            </Container>
        </Layout>
    );
}

type dataApi = {
    data: Product[];
    links: any;
    meta: any;
};

export const getServerSideProps = async ({ params, query }: GetServerSidePropsContext) => {
    const { page } = query;
    const URL = API.getProductsByCategory(params?.category) ;

    const res = await fetch(URL+'?page='+ page);

    if (!res.ok) {
        return {
            notFound: true,
        };
    }
    const dataApi: dataApi = await res.json();

    return { props: { dataApi } };
};
