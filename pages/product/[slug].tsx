import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Storefront } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import RemoveIcon from "@mui/icons-material/Remove";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Breadcrumbs, Button, Chip, Container, Divider, Grid, Paper, Rating, Stack, Typography } from "@mui/material";
import CustomSlider from "components/CustomSlider";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import Loading from "components/Loading";
import API from "Helper/api";
import { formatNumber } from "Helper/function";
import ROUTE from "Helper/Router";
import { AddToCart, Product } from "Helper/Types";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import styles from "styles/Product.module.css";
import useSWR, { SWRResponse } from "swr";
import { Store } from "utils/Store";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const slider = [{ src: "banner1.jpg" }, { src: "banner2.jpg" }, { src: "banner3.jpg" }];

export default function ProductPage({ data }: { data: Product }) {
    const router = useRouter();
    const { slug } = router.query;
    // const URL = API.getProduct(slug);
    // const { data, error }: SWRResponse<Product, Error> = useSWR(URL, fetcher);
    const [amount, setAmount] = useState<number>(1);
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleClickAdd = () => {
        enqueueSnackbar("???? th??m v??o gi??? h??ng!", {
            variant: "success",
            autoHideDuration: 3000,
        });
    };

    const addToCart: AddToCart = (item) => {
        dispatch({ type: "ADD_TO_CART", payload: { ...item, amount: amount } });
    };

    const handleAddToCart = () => {
        if (!userInfo) {
            router.push(ROUTE.signIn);
            return;
        }
        addToCart(data);
        handleClickAdd();
    };

    // if (error) return <div>failed to load</div>;
    if (!data) return <Loading />;

    return (
        <Layout>
            <Container sx={{ mt: 2, mb: 5 }}>
                <Breadcrumbs sx={{ pl: 2 }}>
                    <NextLink href={ROUTE.home} passHref>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang Ch???
                    </NextLink>
                    <span>
                        <Storefront sx={{ mr: 0.5 }} fontSize="inherit" />
                        {data.name}
                    </span>
                </Breadcrumbs>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ p: 2, height: "100%" }}>
                            <CustomSlider slider={slider} />
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <div>
                                <Typography variant="h6">Chi ti???t</Typography>
                                <ul>
                                    <li>Ch??nh h??ng, M???i 100%, Nguy??n seal </li>
                                    <li>M??n h??nh: 10,1 inch IPS LCD, 400 nits (typ) </li>
                                    <li>Camera sau: 5MP - Camera tr?????c: 8MP </li>
                                    <li>CPU: MediaTek Helio P22 </li>
                                    <li>B??? nh???: 32GB - RAM: 2GB - H??? ??i???u h??nh: Android </li>
                                </ul>
                            </div>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <div>
                                <Typography variant="h6">
                                    Khuy???n m??i li??n quan <Image src="/img/km.png" width={20} height={20} alt="" />
                                </Typography>
                                <ul>
                                    <li>
                                        Nh???p m?? <b>PV300</b> gi???m th??m 3% t???i ??a 300.000?? khi thanh to??n qua VNPAY-QR.
                                    </li>
                                    <li>
                                        Nh???p m?? <b>APPLE800</b> gi???m th??m % t???i ??a 800.000??. ??p d???ng cho m???t s??? s???n ph???m
                                        Apple tr??n 20.000.000?? khi thanh to??n qua VNPAY-QR.
                                    </li>
                                    <li>
                                        Nh???p m?? <b>APPLENEW</b> gi???m th??m 5% t???i ??a 1.000.000??. ??p d???ng cho c??c s???n ph???m
                                        iPhone 13, Ipad 9th GEN & Mini 6 khi thanh to??n qua VNPAY-QR.
                                    </li>
                                    <li>
                                        Nh???p m?? <b>PV300</b> gi???m th??m 3% t???i ??a 300.000?? khi thanh to??n qua VNPAY-QR.
                                    </li>
                                </ul>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h5">{data.name}</Typography>
                            <Typography variant="subtitle1">
                                Th????ng hi???u: <Chip label={data.manufacturer} />
                            </Typography>
                            <Stack
                                sx={{ mt: 1, mb: 1 }}
                                direction="row"
                                spacing={2}
                                divider={<Divider orientation="vertical" flexItem />}
                            >
                                <Chip label={data.rating.rate} color="warning" />
                                <Rating sx={{ color: "red" }} value={data.rating.rate} readOnly />
                                <Chip label={`${data.rating.count} B??nh Ch???n`} />
                            </Stack>
                            <Typography variant="button" component="div" color="blue" fontWeight="bold">
                                C??n h??ng
                            </Typography>
                            {data.price_sale > 0 ? (
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="subtitle2" component="small" className={styles.priceOld}>
                                        {formatNumber(data.price)} ??
                                    </Typography>
                                </Stack>
                            ) : null}
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="h6" component="div" className={styles.price}>
                                    {formatNumber(data.price_sale > 0 ? data.price_sale : data.price)} ??
                                </Typography>
                                <Chip label="Tr??? g??p 0%" />
                            </Stack>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Typography variant="body2" component="p" sx={{ color: "Highlight" }}>
                                {/* ${data.content} */}
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Chip
                                    variant="outlined"
                                    onClick={() => setAmount(amount - 1)}
                                    disabled={amount == 1}
                                    label={<RemoveIcon />}
                                ></Chip>
                                <Chip label={amount} size="medium" color="success" variant="outlined" />

                                <Chip
                                    variant="outlined"
                                    onClick={() => setAmount(amount + 1)}
                                    // disabled={item.amount === item.countInStock}
                                    label={<AddIcon />}
                                ></Chip>
                            </Stack>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    handleAddToCart();
                                }}
                                sx={{ lineHeight: 1.5, p: 1, mt: 2 }}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 5 }} />
                                <span className={styles.textBtn}>Th??m v??o gi??? h??ng</span>
                            </Button>
                            <Stack sx={{ mt: 1 }}>
                                <Divider sx={{ mt: 2, mb: 2 }} />
                                <div className={styles.service}>
                                    <Typography sx={{ fontWeight: "bold" }}>Ch??nh s??ch b??n h??ng</Typography>
                                    <div className={styles.serviceItem}>
                                        <LocalShippingOutlinedIcon />
                                        Mi???n ph?? giao h??ng cho ????n h??ng t??? 500K
                                    </div>
                                    <div className={styles.serviceItem}>
                                        <VerifiedUserOutlinedIcon />
                                        Cam k???t h??ng ch??nh h??ng 100%
                                    </div>
                                    <div className={styles.serviceItem}>
                                        <PublishedWithChangesIcon />
                                        ?????i tr??? trong v??ng 10 ng??y
                                    </div>
                                </div>
                                <div className={styles.service}>
                                    <Typography sx={{ fontWeight: "bold" }}>D???ch v??? kh??c</Typography>
                                    <div className={styles.serviceItem}>
                                        <SettingsSuggestIcon />
                                        S???a ch???a ?????ng gi?? 150.000??.
                                    </div>
                                    <div className={styles.serviceItem}>
                                        <DevicesIcon />
                                        V??? sinh m??y t??nh, laptop.
                                    </div>
                                    <div className={styles.serviceItem}>
                                        <VerifiedUserOutlinedIcon />
                                        B???o h??nh t???i nh??.
                                    </div>
                                </div>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Paper sx={{ p: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" className={styles.contentTitle}>
                                M?? t??? s???n ph???m
                            </Typography>
                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" className={styles.contentTitle}>
                                Th??ng s??? k?? thu???t
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: data.detail }}></div>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    const URL = API.getProduct(params?.slug);

    const res = await fetch(URL);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { data }, // will be passed to the page component as props
    };
};
