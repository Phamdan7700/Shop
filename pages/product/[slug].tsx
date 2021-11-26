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
        enqueueSnackbar("Đã thêm vào giỏ hàng!", {
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
                        Trang Chủ
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
                                <Typography variant="h6">Chi tiết</Typography>
                                <ul>
                                    <li>Chính hãng, Mới 100%, Nguyên seal </li>
                                    <li>Màn hình: 10,1 inch IPS LCD, 400 nits (typ) </li>
                                    <li>Camera sau: 5MP - Camera trước: 8MP </li>
                                    <li>CPU: MediaTek Helio P22 </li>
                                    <li>Bộ nhớ: 32GB - RAM: 2GB - Hệ điều hành: Android </li>
                                </ul>
                            </div>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <div>
                                <Typography variant="h6">
                                    Khuyến mãi liên quan <Image src="/img/km.png" width={20} height={20} alt="" />
                                </Typography>
                                <ul>
                                    <li>
                                        Nhập mã <b>PV300</b> giảm thêm 3% tối đa 300.000đ khi thanh toán qua VNPAY-QR.
                                    </li>
                                    <li>
                                        Nhập mã <b>APPLE800</b> giảm thêm % tối đa 800.000đ. Áp dụng cho một số sản phẩm
                                        Apple trên 20.000.000đ khi thanh toán qua VNPAY-QR.
                                    </li>
                                    <li>
                                        Nhập mã <b>APPLENEW</b> giảm thêm 5% tối đa 1.000.000đ. Áp dụng cho các sản phẩm
                                        iPhone 13, Ipad 9th GEN & Mini 6 khi thanh toán qua VNPAY-QR.
                                    </li>
                                    <li>
                                        Nhập mã <b>PV300</b> giảm thêm 3% tối đa 300.000đ khi thanh toán qua VNPAY-QR.
                                    </li>
                                </ul>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h5">{data.name}</Typography>
                            <Typography variant="subtitle1">
                                Thương hiệu: <Chip label={data.manufacturer} />
                            </Typography>
                            <Stack
                                sx={{ mt: 1, mb: 1 }}
                                direction="row"
                                spacing={2}
                                divider={<Divider orientation="vertical" flexItem />}
                            >
                                <Chip label={data.rating.rate} color="warning" />
                                <Rating sx={{ color: "red" }} value={data.rating.rate} readOnly />
                                <Chip label={`${data.rating.count} Bình Chọn`} />
                            </Stack>
                            <Typography variant="button" component="div" color="blue" fontWeight="bold">
                                Còn hàng
                            </Typography>
                            {data.price_sale > 0 ? (
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="subtitle2" component="small" className={styles.priceOld}>
                                        {formatNumber(data.price)} đ
                                    </Typography>
                                </Stack>
                            ) : null}
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="h6" component="div" className={styles.price}>
                                    {formatNumber(data.price_sale > 0 ? data.price_sale : data.price)} đ
                                </Typography>
                                <Chip label="Trả góp 0%" />
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
                                <span className={styles.textBtn}>Thêm vào giỏ hàng</span>
                            </Button>
                            <Stack sx={{ mt: 1 }}>
                                <Divider sx={{ mt: 2, mb: 2 }} />
                                <div className={styles.service}>
                                    <Typography sx={{ fontWeight: "bold" }}>Chính sách bán hàng</Typography>
                                    <div className={styles.serviceItem}>
                                        <LocalShippingOutlinedIcon />
                                        Miễn phí giao hàng cho đơn hàng từ 500K
                                    </div>
                                    <div className={styles.serviceItem}>
                                        <VerifiedUserOutlinedIcon />
                                        Cam kết hàng chính hãng 100%
                                    </div>
                                    <div className={styles.serviceItem}>
                                        <PublishedWithChangesIcon />
                                        Đổi trả trong vòng 10 ngày
                                    </div>
                                </div>
                                <div className={styles.service}>
                                    <Typography sx={{ fontWeight: "bold" }}>Dịch vụ khác</Typography>
                                    <div className={styles.serviceItem}>
                                        <SettingsSuggestIcon />
                                        Sửa chữa đồng giá 150.000đ.
                                    </div>
                                    <div className={styles.serviceItem}>
                                        <DevicesIcon />
                                        Vệ sinh máy tính, laptop.
                                    </div>
                                    <div className={styles.serviceItem}>
                                        <VerifiedUserOutlinedIcon />
                                        Bảo hành tại nhà.
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
                                Mô tả sản phẩm
                            </Typography>
                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" className={styles.contentTitle}>
                                Thông số kĩ thuật
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
