import LoadingButton from "@mui/lab/LoadingButton";
import { Backdrop, CircularProgress, LinearProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
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
import { UserType } from "Helper/Types";
import Cookies from "js-cookie";
import Image from "next//image";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Store } from "utils/Store";

interface IFormInputs {
    email: string;
    password: string;
    remember: boolean;
}
interface ResponseData {
    data: UserType;
    token: string;
    message: string;
    success: boolean;
}
export default function SignInSide() {
    const router = useRouter();
    const { redirect } = router.query;
    const [errorResponse, setErrorResponse] = useState<any>({});

    const { state, dispatch } = useContext(Store);
    const [userInfo, setUserInfo] = React.useState(() => {
        return Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")!) : null;
    });

    const auth_token =  Cookies.get("auth_token") ? JSON.parse(Cookies.get("auth_token")!) : null
    const [open, setOpen] = React.useState(false);

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
                router.push(typeof redirect === "string" ? redirect : ROUTE.home);
            },
        });
        setOpen(true);
        setLoading(false);
    };
    // Form
    const {
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>();
    const watchEmail = watch("email");
    const watchPassword = watch("password");
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        setLoading(true);
        getCsrfCookies().then(() => {
            axiosClient
                .post(API.login, data, { withCredentials: true })
                .then(function (response) {
                    if (response.data.success) {
                        handleLogin(response.data);
                    } else {
                        console.log(response.data.errors);

                        setErrorResponse(response.data.errors);
                        enqueueSnackbar(response.data.message, {
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
    useEffect(() => {
        watchEmail && setErrorResponse({...errorResponse, email:''})
           
    }, [watchEmail]);

    useEffect(() => {
        watchPassword && setErrorResponse({...errorResponse, password:''})
           
    }, [watchPassword]);

    useEffect(() => {
        if (userInfo && auth_token) {
            router.push(typeof redirect === "string" ? redirect : ROUTE.home);
        }
    }, []);

    return (
        <>
            <Head>
                <title>????ng nh???p</title>
            </Head>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }} open={open}>
                    <div>??ang chuy???n h?????ng ...</div>
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
                            Sign in
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
                                        autoFocus
                                        helperText={errors.email?.message || errorResponse?.email}
                                        error={Boolean(errors.email || errorResponse.email)}
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
                                        inputProps={{ type: "password" }}
                                        helperText={errors.password?.message || errorResponse?.password}
                                        error={Boolean(errors.password || errorResponse.password)}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="remember"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => <Checkbox color="primary" id="remember" {...field} />}
                            />
                            <label htmlFor="remember">Duy tr?? ????ng nh???p</label>

                            <LoadingButton
                                type="submit"
                                loading={loading}
                                loadingPosition="end"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                ????ng nh???p
                            </LoadingButton>
                            <Grid container>
                                <Grid item xs>
                                    <Link href={ROUTE.forgotPassword}>Qu??n m???t kh???u?</Link>
                                </Grid>
                                <Grid item>
                                    Ch??a c?? t??i kho???n?{" "}
                                    <Link href={ROUTE.signUp} color="red">
                                        {"????ng k??"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
