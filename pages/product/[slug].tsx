import { Storefront } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import {
    Breadcrumbs,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import NextLink from "components/Link";
import Loading from "components/Loading";
import ROUTE from "Helper/Router";
import { Product } from "Helper/Types";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { BaseSyntheticEvent, useContext, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "styles/Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Store } from "utils/Store";
import Layout from "components/Layouts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage() {
    const router = useRouter();
    const { slug } = router.query;
    const URL = `https://fakestoreapi.com/products/${slug}`;
    const { data, error }: SWRResponse<Product, Error> = useSWR(URL, fetcher);
    const [amount, setAmount] = useState<number>(1);
    const { state, dispatch } = useContext(Store);

    if (error) return <div>failed to load</div>;
    if (!data) return <Loading />;

    return (
        <Layout>
            <Container sx={{ mt: 2, mb: 5 }}>
                <Breadcrumbs sx={{ pl: 2 }}>
                    <NextLink href={ROUTE.home} passHref>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang Chủ
                    </NextLink>
                    <span>
                        <Storefront sx={{ mr: 0.5 }} fontSize="inherit" />
                        {data.title}
                    </span>
                </Breadcrumbs>
                <Grid container spacing={5} sx={{ mt: 3 }}>
                    <Grid item xs={6}>
                        <Paper>
                            <Image
                                src={data.image}
                                alt="img"
                                width={"100%"}
                                height={"100%"}
                                layout="responsive"
                                objectFit="contain"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">{data.title}</Typography>
                        <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                            <Box className={styles.countRate}>{data.rating.rate}</Box>
                            <Rating sx={{ color: "red" }} value={data.rating.rate} readOnly />
                            <span>{data.rating.count} Bình Chọn</span>
                        </Stack>
                        <Typography variant="h6" component="div" className={styles.price}>
                            ${data.price}
                        </Typography>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Typography variant="body2" component="p" sx={{ color: "Highlight" }}>
                            ${data.description}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Button
                                variant="outlined"
                                className={styles.btnAmount}
                                size="small"
                                onClick={() => setAmount(amount - 1)}
                                disabled={amount == 1}
                            >
                                <RemoveIcon />
                            </Button>
                            <TextField
                                disabled
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                size="small"
                                className={styles.amount}
                                value={amount}
                                variant="outlined"
                                onBlur={(e: BaseSyntheticEvent) => {
                                    e.target.value > 0 ? console.log(e.target.value) : setAmount(amount);
                                }}
                            ></TextField>
                            <Button
                                variant="outlined"
                                className={styles.btnAmount}
                                size="small"
                                onClick={() => setAmount(amount + 1)}
                                // disabled={item.amount === item.countInStock}
                            >
                                <AddIcon />
                            </Button>
                        </Stack>

                        <Button
                            variant="contained"
                            onClick={() => {
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: { ...data, amount: amount },
                                });
                            }}
                            sx={{ lineHeight: 1.5, p: 2, mt: 2 }}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 5 }} />
                            <span className={styles.textBtn}>Thêm vào giỏ hàng</span>
                        </Button>
                    </Grid>
                </Grid>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box>{data.description}</Box>
            </Container>
        </Layout>
    );
}
