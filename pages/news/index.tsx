import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Chip, Container, Divider, Pagination, PaginationItem, Paper } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import FeaturedPost from "components/Post";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import { Post } from "Helper/Types";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function BLog({ dataApi }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {
        data,
        meta: { current_page, last_page },
    } = dataApi as dataApi;
    const router = useRouter();
    const handleChange = () => {};

    return (
        <Layout>
            <Head>
                <title>Tin công nghệ</title>
            </Head>
            <Container>
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
                        <Chip label="Tin công nghệ" />
                    </Breadcrumbs>
                    <Box sx={{ p: 2 }}>
                        {data.map((post) => (
                            <div key={post.id}>
                                <NextLink href={ROUTE.getPost(post.id)}>
                                    <FeaturedPost key={post.title} post={post} />
                                </NextLink>
                                <Divider sx={{ mt: 2, mb: 2, visibility: "hidden" }} />
                            </div>
                        ))}
                    </Box>
                    <Pagination
                        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                        count={last_page}
                        color="standard"
                        page={current_page}
                        variant="outlined"
                        renderItem={(item) => (
                            <PaginationItem
                                component={NextLink}
                                href={`${item.page === 1 ? "" : `?page=${item.page}`}`}
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
    data: Post[];
    links: any;
    meta: any;
};

export const getServerSideProps = async ({  query }: GetServerSidePropsContext) => {
    const URL = API.blog;
    const { page } = query;

    const res = await fetch(URL + "?page=" + page);

    if (!res.ok) {
        return {
            notFound: true,
        };
    }
    const dataApi: dataApi = await res.json();

    return { props: { dataApi } };
};
