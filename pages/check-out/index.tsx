import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Chip, LinearProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import Layout from "components/Layouts";
import NextLink from "components/Link";
import API from "Helper/api";
import axiosClient from "Helper/API/AxiosClient";
import ROUTE from "Helper/Router";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "utils/Store";
import AddressForm from "../../components/Checkout/AddressForm";
import PaymentForm from "../../components/Checkout/PaymentForm";
import Review from "../../components/Checkout/Review";
import Cookies from "js-cookie";
import getCsrfCookies from "Helper/API/getCsrfCookies";

const steps = ["Địa chỉ ", "Thanh toán", "Xác nhận"];
interface IFormInputs {
    name: string;
    phone: number;
    province: string;
    district: string;
    ward: string;
    village: string;
}
export default function Checkout() {
    const route = useRouter();
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = useState<IFormInputs | null>(null);
    const {
        state: { shoppingCart },
    } = useContext(Store);
    const { cart } = shoppingCart;

    const [orderSuccess, setOrderSuccess] = useState(false);
    const [order, setOrder] = useState(null);
    const { state, dispatch } = useContext(Store);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const user = Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")!) : null;
    const token = Cookies.get("auth_token") ? JSON.parse(Cookies.get("auth_token")!) : "";

    // Check validate
    function handleSubmit(data: IFormInputs | null) {
        handleNext();
        if (data) {
            setFormData(data);
        }
        if (activeStep === steps.length - 1) {
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            getCsrfCookies().then(() => {
                axiosClient
                    .post(API.order, {
                        shoppingCart,
                        user,
                        formData,
                    })
                    .then((res) => {
                        setOrderSuccess(res.data.success);
                        setOrder(res.data.order);
                        dispatch({type:'ORDER_SUCCESS'})
                    })
                    .catch(() => {
                        route.push(ROUTE.signIn);
                    });
            });
        }
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm onFormSubmit={handleSubmit} formData={formData} />;
            case 1:
                return <PaymentForm onFormSubmit={handleSubmit} formData={formData} />;
            case 2:
                return <Review onFormSubmit={handleSubmit} formData={formData} />;
            default:
                throw new Error("Unknown step");
        }
    }

    function currentForm(activeStep: number) {
        switch (activeStep) {
            case 0:
                return "AddressForm";
            case 1:
                return "PaymentForm";
            case 2:
                return "Review";
            default:
                throw new Error("Unknown step");
        }
    }

    useEffect(() => {
        console.log(user, token);

        if (!user || !token) {
            route.push(ROUTE.signIn + "?redirect=" + ROUTE.checkOut);
        }
    });

    return (
        <Layout>
            <Head>
                <title>Đặt hàng</title>
            </Head>
            <Container>
                <Paper sx={{ mt: 2, mb: 2, p: 2, minHeight:'80vh' }}>
                    <Breadcrumbs sx={{ pl: 2, mb: 3 }}>
                        <Chip
                            color="info"
                            component={NextLink}
                            label="Trang Chủ"
                            icon={<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                            href={ROUTE.home}
                            clickable
                        />
                        <Chip label="Đặt hàng" />
                    </Breadcrumbs>
                    {cart.length > 0 || orderSuccess ? (
                        <Paper variant="outlined" sx={{ m: { xs: 3, md: 6 }, p: { xs: 2, md: 5 } }}>
                            <Typography component="h1" variant="h4" align="center">
                                Thông tin mua hàng
                            </Typography>
                            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <React.Fragment>
                                {activeStep === steps.length ? (
                                    orderSuccess ? (
                                        <React.Fragment>
                                            <Typography variant="h5" gutterBottom textAlign="center">
                                                Bạn đã đặt hàng thành công. <br /> Mã đơn hàng của bạn:{" "}
                                                <Chip label={`#${order}`} />
                                            </Typography>
                                            <Typography variant="subtitle1" textAlign="center">
                                                Cảm ơn bạn đã mua sắm tại SHOP.VN. Đơn hàng của bạn đang được xử lý.
                                            </Typography>
                                            <Typography textAlign="center" component="div" sx={{ mt: 2 }}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        route.push(ROUTE.home);
                                                    }}
                                                >
                                                    Tiếp tục mua sắm
                                                </Button>
                                            </Typography>
                                        </React.Fragment>
                                    ) : (
                                        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                                            <LinearProgress color="error" />
                                            <LinearProgress color="success" />
                                            <LinearProgress color="primary" />
                                            <LinearProgress color="info" />
                                            <LinearProgress color="warning" />
                                        </Stack>
                                    )
                                ) : (
                                    <React.Fragment>
                                        {getStepContent(activeStep)}
                                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                            {activeStep !== 0 && (
                                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                                    Trở lại
                                                </Button>
                                            )}
                                            <Button
                                                type="submit"
                                                form={currentForm(activeStep)}
                                                variant="contained"
                                                // onClick={handleSubmit}
                                                sx={{ mt: 3, ml: 1 }}
                                            >
                                                {activeStep === steps.length - 1 ? "Đặt hàng" : "Tiếp tục"}
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        </Paper>
                    ) : (
                        <Typography textAlign="center" component="div" sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    route.push(ROUTE.home);
                                }}
                            >
                                Tiếp tục mua sắm
                            </Button>
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Layout>
    );
}
