import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Container, Pagination } from "@mui/material";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";

export default function BLog({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const handleChange = () => {};

    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
            </Head>
            <Container sx={{ mt: 2 }}>
                <Breadcrumbs sx={{ pl: 2 }}>
                    <NextLink href={ROUTE.home} passHref>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang Chủ
                    </NextLink>
                    <span>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {post.title}
                    </span>
                </Breadcrumbs>
                <div dangerouslySetInnerHTML={{ __html: post.content }} style={{ textAlign:'justify' }}></div>
            </Container>
        </Layout>
    );
}

type Post = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    view: number;
    created_at: Date;
    updated_at: Date;
};

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    const URL = API.getBlog(params?.slug);
    const res = await fetch(URL);
    const post: Post = await res.json();

    return {
        props: {
            post,
        },
    };
};
