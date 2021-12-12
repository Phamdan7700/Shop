import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "components/Link";
import API from "Helper/api";
import axiosClient from "Helper/API/AxiosClient";
import getCsrfCookies from "Helper/API/getCsrfCookies";
import ROUTE from "Helper/Router";
import Image from "next//image";
import Head from "next/head";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
    email: string;
    status: string;
}
interface ResponseData {
    data: IFormInputs;
}
export default function SignInSide() {
    const [errorResponse, setErrorResponse] = useState<string>("");

    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    // Form
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        setLoading(true);
        getCsrfCookies().then(() => {
            axiosClient
                .post(API.forgotPassword, data, { withCredentials: true })
                .then(function (response) {
                    if (response.data.status) {
                        setErrorResponse("");
                        enqueueSnackbar(response.data.status, {
                            variant: "success",
                            autoHideDuration: 3000,
                            anchorOrigin: { vertical: "top", horizontal: "center" },
                        });
                        setLoading(false);
                    }
                    if (response.data.email) {
                        setErrorResponse(response.data.email);
                        enqueueSnackbar(response.data.email, {
                            variant: "error",
                            autoHideDuration: 3000,
                            anchorOrigin: { vertical: "top", horizontal: "center" },
                        });
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    console.log(error.response);
                    setLoading(false);
                });
        });
    };

    return (
        <>
            <Head>
                <title>Quên mật khẩu</title>
            </Head>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(/img/andras-vas-Bd7gNnWJBkU-unsplash.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Link href={ROUTE.home} height="100">
                            <Image src="/logo.png" width="200" height="100" alt="" objectFit="contain" />
                        </Link>
                        <Typography component="h1" variant="h5">
                            Forgot Password
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: "100%" }}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: { value: true, message: "Vui lòng nhập địa chỉ email" },
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: "Vui lòng kiếm tra lại định dạng email",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Địa chỉ Email"
                                        autoFocus
                                        helperText={errors.email?.message}
                                        error={Boolean(errors.email)}
                                        {...field}
                                    />
                                )}
                            />

                            <LoadingButton
                                type="submit"
                                loading={loading}
                                loadingPosition="end"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Gửi
                            </LoadingButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
