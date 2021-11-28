import { Breadcrumbs, Chip, Container, Paper } from "@mui/material";
import Layout from "components/Layouts";
import Head from "next/head";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ROUTE from "Helper/Router";
import Link from "components/Link";

export default function index() {
    return (
        <Layout>
            <Head>
                <title>Liên hệ </title>
            </Head>
            <Container>
                <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
                    <Breadcrumbs sx={{ pl: 2 }}>
                        <Chip
                            color="info"
                            component={Link}
                            label="Trang Chủ"
                            icon={<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                            href={ROUTE.home}
                            clickable
                        />
                        <Chip label="Liên hệ" />
                    </Breadcrumbs>
                </Paper>
            </Container>
        </Layout>
    );
}
