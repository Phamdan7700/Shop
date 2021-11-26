import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Button, CardActionArea, CardActions, Container, Grid, Pagination } from "@mui/material";
import Head from "next/head";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import HomeIcon from "@mui/icons-material/Home";
import ROUTE from "Helper/Router";
import API from "Helper/api";
import { InferGetStaticPropsType } from "next";
import Loading from "components/Loading";

export default function BLog({ dataApi }: InferGetStaticPropsType<typeof getStaticProps>) {
    
    const { data, meta } = dataApi as dataApi ;

    const handleChange = () => {};

    return (
        <Layout>
            <Head>
                <title>Tin công nghệ</title>
            </Head>
            <Container sx={{ mt: 2 }}>
                <Breadcrumbs sx={{ pl: 2 }}>
                    <NextLink href={ROUTE.home} passHref>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang Chủ
                    </NextLink>
                    <NextLink href={ROUTE.cart} passHref>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Tin công nghệ
                    </NextLink>
                </Breadcrumbs>
                <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 3 }} m={0} >
                    {data.map((post) => (
                        <Grid key={post.id} item xs={1} sm={1} md={1}>
                            <NextLink key={post.id} href={ROUTE.getPost(post.id)}>
                                <Card sx={{ maxWidth: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={post.thumbnail}
                                            alt="thumbnail"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {post.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" variant='outlined'>
                                            Share
                                        </Button>
                                        <Button size="small" color="primary" variant='outlined'>
                                            Xem tiếp
                                        </Button>
                                    </CardActions>
                                </Card>
                            </NextLink>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    sx={{ display: "flex", justifyContent: "center", mt: 5 }}
                    count={10}
                    color="primary"
                    onChange={handleChange}
                />
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

type dataApi = {
    data: Post[];
    links: any;
    meta: any;
};

const URL = API.blog;
export const getStaticProps = async () => {
    const res = await fetch(URL);

    if (!res.ok) {
        return {
            notFound: true,
        };
    }
    const dataApi: dataApi = await res.json();

    return { props: { dataApi } };
};


