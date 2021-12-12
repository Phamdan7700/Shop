import LoadingButton from "@mui/lab/LoadingButton";
import { Backdrop, CircularProgress } from "@mui/material";
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
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
    password: string;
    password_confirmation: string;
}
interface ResponseData {
    data: IFormInputs;
}
export default function SignInSide() {
    const router = useRouter();
    const { token, email } = router.query;
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    // Form
    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log({ ...data, token, email });

        setLoading(true);
        getCsrfCookies().then(() => {
            axiosClient
                .post(API.resetPassword, { ...data, token, email }, { withCredentials: true })
                .then(function (response) {
                    if (response.data.status) {
                        enqueueSnackbar(response.data.status, {
                            variant: "success",
                            autoHideDuration: 3000,
                            anchorOrigin: { vertical: "top", horizontal: "center" },
                            onClose: () => {
                                router.push(ROUTE.signIn);
                            },
                        });
                        setOpen(true)
                        setLoading(false);
                    }
                    if (response.data.email) {
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
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }} open={open}>
                    <div>Đang chuyển hướng ...</div>
                    <CircularProgress color="warning" />
                    <CircularProgress color="success" />
                    <CircularProgress color="error" />
                </Backdrop>
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
                            Reset Password
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: "100%" }}>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: { value: true, message: "Vui lòng nhập mật khẩu" },
                                    minLength: { value: 8, message: "Vui lòng nhập tối thiểu 8 ký tự" },
                                    maxLength: { value: 255, message: "Mật khẩu quá dài" },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Mật khẩu"
                                        type="password"
                                        id="password"
                                        helperText={errors.password?.message}
                                        error={Boolean(errors.password)}
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                name="password_confirmation"
                                control={control}
                                rules={{
                                    required: { value: true, message: "Vui lòng nhập mật khẩu" },
                                    minLength: { value: 8, message: "Vui lòng nhập tối thiểu 8 ký tự" },
                                    maxLength: { value: 255, message: "Mật khẩu quá dài" },
                                    validate: (value) => value === watch("password") || "Mật khẩu không trùng khớp",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Nhập lại mật khẩu"
                                        type="password"
                                        id="password_confirmation"
                                        helperText={errors.password_confirmation?.message}
                                        error={Boolean(errors.password_confirmation)}
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
                                Đặt lại mật khẩu
                            </LoadingButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
