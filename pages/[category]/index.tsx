import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Chip, Container, Divider, Grid, Pagination, PaginationItem, Paper, Stack } from "@mui/material";
import CardProduct from "components/CardProduct";
import Layout from "components/Layouts";
import { default as Link, default as NextLink } from "components/Link";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import { Product } from "Helper/Types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Products({ dataApi }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {
        data,
        meta: { current_page, last_page },
    } = dataApi as dataApi;
    const router = useRouter();
    const { category } = router.query;
    const [title, setTitle] = useState("");
    function handleTitle(title: string): string {
        switch (title) {
            case "laptop":
                return "Laptop";

            case "dien-thoai":
                return "Điện thoại";

            case "phu-kien":
                return "Phụ kiện";
            default:
                return "";
        }
    }
    useEffect(() => {
        setTitle(handleTitle(category as string));
    }, [category]);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(`${category}?page=${value}`);
    };
    function capitalizeFirstLetter(string: string): string {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    }
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <Container>
                <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
                    <Breadcrumbs sx={{ pl: 2 }}>
                        <Chip
                            color="info"
                            component={NextLink}
                            label="Trang Chủ"
                            icon={<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                            href={ROUTE.home}
                            clickable
                        />
                        <Chip label={title} />
                    </Breadcrumbs>
                    <Stack spacing={2} justifyContent="end" direction="row">
                        <Chip clickable label={"Khuyến mãi tốt nhất"} />
                        <Chip clickable label={"Bán chạy"} />
                        <Chip clickable label={"Giá giảm dần"} />
                        <Chip clickable label={"Giá tăng dần"} />
                        <Chip clickable label={"Mới về"} />
                    </Stack>
                    <Divider sx={{ mt: 2, mb: 2 }} />

                    <Grid container spacing={2} pb={5} mt={2}>
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
                        color="standard"
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
                </Paper>
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
    const URL = API.getProductsByCategory(params?.category);

    const res = await fetch(URL + "?page=" + page);

    if (!res.ok) {
        return {
            notFound: true,
        };
    }
    const dataApi: dataApi = await res.json();

    return { props: { dataApi } };
};
