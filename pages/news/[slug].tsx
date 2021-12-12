import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Container, Divider, Grid, ListItemButton, Paper, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Layout from "components/Layouts";
import Link from "components/Link";
import NextLink from "components/Link";
import API from "Helper/api";
import axiosClient from "Helper/API/AxiosClient";
import ROUTE from "Helper/Router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function BLog({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const route = useRouter();
    const { slug } = route.query;
    const [relativePost, setRelativePost] = useState<Post[]>([]);
    useEffect(() => {
        axiosClient.get(API.getRelativePost(slug)).then((res) => {
            setRelativePost(res.data);
        });
    }, [slug]);

    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
            </Head>
            <Container sx={{ mt: 2 }}>
                <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h6" textAlign="center" sx={{ mt:2 }}>
                                Bài viết liên quan
                            </Typography>
                            <List>
                                {relativePost.map((post, index) => (
                                    <ListItemButton key={index}>
                                        <Link href={ROUTE.getPost(post.id)}>
                                            <ListItem>
                                                <ListItemText primary={post.title}></ListItemText>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </Link>
                                    </ListItemButton>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Paper>
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
