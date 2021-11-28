import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Chip } from "@mui/material";
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
import ROUTE from "Helper/Router";
import Head from "next/head";
import React from "react";
import AddressForm from "../../components/Checkout/AddressForm";
import PaymentForm from "../../components/Checkout/PaymentForm";
import Review from "../../components/Checkout/Review";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error("Unknown step");
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Layout>
            <Head>
                <title>Đặt hàng</title>
            </Head>
            <Container>
                <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
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
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Your order number is #2001539. We have emailed your order confirmation, and will
                                        send you an update when your order has shipped.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                                Back
                                            </Button>
                                        )}
                                        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                                            {activeStep === steps.length - 1 ? "Place order" : "Next"}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </Paper>
            </Container>
        </Layout>
    );
}
