import { Grid, Pagination } from "@mui/material";
import axios from "axios";
import CardProduct from "components/CardProduct";
import Link from "components/Link";
import Loading from "components/Loading";
import API from "Helper/api";
import ROUTE from "Helper/Router";
import { Product } from "Helper/Types";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface Response {
    data: Product[];
    meta: any;
}
function ProductList() {
    const [page, setPage] = React.useState(1);
    const [dataResponse, setDataResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const elm = useRef();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        elm.current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    };

    useEffect(() => {
        const URL = API.product;
        axios
            .get(URL, { params: { page } })
            .then((res) => {
                setDataResponse(res.data);
                setLoading(false);
            })
            .catch((error) => setError(error));
    }, [page]);
    if (error) return <div>Có lỗi</div>;
    if (loading) return <Loading />;

    const {
        data,
        meta: { last_page },
    } = dataResponse as any;

    return (
        <div className={styles.wrapper}>
            <h3 className="title" ref={elm}>
                {" "}
                Dành cho bạn{" "}
            </h3>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                {data.map((item: Product) => (
                    <Grid key={item.id} item xs={2} sm={2} md={3}>
                        <Link key={item.id} href={ROUTE.getProduct(item.id)}>
                            <CardProduct product={item} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                sx={{ display: "flex", justifyContent: "center", mt: 5 }}
                count={last_page}
                color="primary"
                onChange={handleChange}
            />
        </div>
    );
}

export default ProductList;
