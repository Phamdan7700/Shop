import HomeIcon from "@mui/icons-material/Home";
import {
    Breadcrumbs,
    Chip,
    Container,
    Divider,
    Grid,
    Pagination,
    PaginationItem,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import axios from "axios";
import CardProduct from "components/CardProduct";
import Layout from "components/Layouts";
import { default as Link, default as NextLink } from "components/Link";
import Loading from "components/Loading";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import { Product } from "Helper/Types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CancelIcon from "@mui/icons-material/Cancel";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import StarIcon from "@mui/icons-material/Star";
import FlashOnIcon from "@mui/icons-material/FlashOn";

export default function Products() {
    const [sort, setSort] = useState<string | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [rating, setRating] = useState<"desc" | null>(null);
    const [sale, setSale] = useState<"desc" | null>(null);
    const [newP, setNewP] = useState<number>(0);

    const router = useRouter();
    const { category, page } = router.query;
    const [title, setTitle] = useState("");
    const [dataResponse, setDataResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (category) {
            const url = API.getProductsByCategory(category);
            axios
                .get(url, { params: { page: page ?? 1, sort, search, sale, rating, new: newP } })
                .then((res) => setDataResponse(res.data))
                .catch((error) => setError(error));
        }
    }, [page, sort, search, category, sale, rating, newP]);

    useEffect(() => {
        setTitle(handleTitle(category as string));
    }, [category]);

    if (error) return <div>Error</div>;
    if (!dataResponse)
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    const {
        data,
        meta: { current_page, last_page },
    } = dataResponse as dataApi;

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

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(`${category}?page=${value}`);
    };
    // sort
    function handleSort(value: "asc" | "desc") {
        setSort(value);
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    function resetSort() {
        setSort(null);
    }

    function resetSale() {
        setSale(null);
    }

    function resetRating() {
        setRating(null);
    }

    function resetNew() {
        setNewP(0);
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
                        <Chip
                            clickable
                            label={"Khuyến mãi tốt nhất"}
                            color={sale ? "primary" : "default"}
                            onDelete={sale ? resetSale : () => {}}
                            onClick={() => {
                                setSale("desc");
                            }}
                            deleteIcon={sale ? <CancelIcon /> : <LoyaltyIcon />}
                        />
                        <Chip
                            clickable
                            label={"Bán chạy"}
                            color={rating ? "primary" : "default"}
                            onDelete={rating ? resetRating : () => {}}
                            onClick={() => {
                                setRating("desc");
                            }}
                            deleteIcon={rating ? <CancelIcon /> : <StarIcon />}
                        />
                        <Chip
                            clickable
                            label={"Giá giảm dần"}
                            color={sort == "desc" ? "primary" : "default"}
                            onDelete={sort == "desc" ? resetSort : () => {}}
                            onClick={() => {
                                handleSort("desc");
                            }}
                            deleteIcon={sort == "desc" ? <CancelIcon /> : <ArrowDownwardIcon />}
                        />
                        <Chip
                            clickable
                            label={"Giá tăng dần"}
                            color={sort == "asc" ? "primary" : "default"}
                            onDelete={sort == "asc" ? resetSort : () => {}}
                            onClick={() => {
                                handleSort("asc");
                            }}
                            deleteIcon={sort == "asc" ? <CancelIcon /> : <ArrowUpwardIcon />}
                        />
                        <Chip
                            clickable
                            label={"Mới về"}
                            color={newP ? "primary" : "default"}
                            onDelete={newP ? resetNew : () => {}}
                            onClick={() => {
                                setNewP(1);
                            }}
                            deleteIcon={newP ? <CancelIcon /> : <FlashOnIcon />}
                        />
                    </Stack>
                    <Stack justifyContent="end" direction="row" sx={{ mt: 2 }}>
                        <TextField label="Tìm kiếm" onChange={handleSearch} />
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

// export const getServerSideProps = async ({ params, query }: GetServerSidePropsContext) => {
//     const { page, sort, search } = query;
//     const URL = API.getProductsByCategory(params?.category);

//     const res = await fetch(URL + "?page=" + page + `&sort=${sort||''}&search=${search||''}`);

//     if (!res.ok) {
//         return {
//             notFound: true,
//         };
//     }
//     const dataApi: dataApi = await res.json();

//     return { props: { dataApi } };
// };
