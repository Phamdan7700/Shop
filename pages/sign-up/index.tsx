import { LoadingButton } from "@mui/lab";
import { Backdrop, CircularProgress, FormControl, FormHelperText, LinearProgress, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "components/Link";
import API from "Helper/api";
import axiosClient from "Helper/API/AxiosClient";
import getCsrfCookies from "Helper/API/getCsrfCookies";
import ROUTE from "Helper/Router";
import { UserType } from "Helper/Types";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Store } from "utils/Store";
import styles from "./index.module.css";
import Head from "next/head";

interface IFormInputs {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    privacy: boolean;
}

interface ResponseData {
    data: UserType;
    token: string;
    message: string;
    success: boolean;
}

export default function SignUp() {
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = useContext(Store);
    const [open, setOpen] = React.useState(false);


    const [errorResponse, setErrorResponse] = useState<any>({});

    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleLogin = (response: ResponseData) => {
        Cookies.set("userInfo", JSON.stringify(response.data));
        Cookies.set("auth_token", JSON.stringify(response.token));
        enqueueSnackbar(response.message, {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
            onClose: () => {
                router.push(ROUTE.home);
            },
        });
        setOpen(true);
        setLoading(false);
    };
    // Form
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        watch,
    } = useForm<IFormInputs>();
    // Handle Sign-up
    const onSubmit: SubmitHandler<IFormInputs> = (formData) => {
        setLoading(true);
        getCsrfCookies().then(() => {
            axiosClient
                .post(API.register, formData)
                .then(function (response) {
                    if (response.data.success) {
                        handleLogin(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error.response);
                    const { data } = error.response;
                    setErrorResponse(data.errors);
                    enqueueSnackbar(data.message, {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                    setLoading(false);
                });
        });
    };

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>????ng K??</title>
            </Head>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
                open={open}
            >
                <div>??ang chuy???n h?????ng ...</div>
                <CircularProgress color="warning" />
                <CircularProgress color="success" />
                <CircularProgress color="error" />
            </Backdrop>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        p: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    component={Paper}
                    elevation={6}
                >
                    <Link href={ROUTE.home} height="100">
                        <Image src="/logo.png" width="200" height="100" alt="" objectFit="contain" />
                    </Link>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng nh???p t??n c???a b???n" },
                                maxLength: { value: 255, message: "T??n qu?? d??i" },
                            }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="T??n c???a b???n"
                                    autoFocus
                                    helperText={errors.name?.message || errorResponse?.name}
                                    error={Boolean(errors.name) || Boolean(errorResponse?.name)}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng nh???p ?????a ch??? email" },
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Vui l??ng ki???m tra l???i ?????nh d???ng email",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="?????a ch??? Email"
                                    inputProps={{ type: "email" }}
                                    helperText={errors.email?.message || errorResponse?.email}
                                    error={Boolean(errors.email) || Boolean(errorResponse?.email)}
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng nh???p m???t kh???u" },
                                minLength: { value: 8, message: "Vui l??ng nh???p t???i thi???u 8 k?? t???" },
                                maxLength: { value: 255, message: "M???t kh???u qu?? d??i" },
                            }}
                            render={({ field }) => (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="M???t kh???u"
                                    type="password"
                                    id="password"
                                    helperText={errors.password?.message || errorResponse?.password}
                                    error={Boolean(errors.password) || Boolean(errorResponse?.password)}
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name="password_confirmation"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng nh???p m???t kh???u" },
                                minLength: { value: 8, message: "Vui l??ng nh???p t???i thi???u 8 k?? t???" },
                                maxLength: { value: 255, message: "M???t kh???u qu?? d??i" },
                                validate: (value) => value === watch("password") || "M???t kh???u kh??ng tr??ng kh???p",
                            }}
                            render={({ field }) => (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Nh???p l???i m???t kh???u"
                                    type="password"
                                    id="password_confirmation"
                                    helperText={errors.password_confirmation?.message}
                                    error={Boolean(errors.password_confirmation)}
                                    {...field}
                                />
                            )}
                        />
                        <FormControl error={Boolean(errors.privacy)}>
                            <Controller
                                name="privacy"
                                control={control}
                                defaultValue={false}
                                rules={{
                                    required: { value: true, message: "Vui l??ng ch???n ?????ng ??" },
                                }}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="?????ng ?? v???i ??i???u kho???n d???ch v??? c???a ch??ng t??i."
                                        {...field}
                                    />
                                )}
                            />
                            <FormHelperText>{errors.privacy?.message}</FormHelperText>
                        </FormControl>

                        <LoadingButton
                            type="submit"
                            loading={loading}
                            loadingPosition="end"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ????ng K??
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                B???n ???? c?? t??i kho???n?{" "}
                                <Link href={ROUTE.signIn}>
                                    <span style={{ color: "red" }}>????ng nh???p</span>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
