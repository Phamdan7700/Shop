import LoadingButton from "@mui/lab/LoadingButton";
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
        setLoading(false);
    };
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
        if (userInfo) {
            router.push(typeof redirect === "string" ? redirect : ROUTE.home);
        }
    }, []);

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: "url(https://source.unsplash.com/random)",
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
                        <label htmlFor="remember">Duy trì đăng nhập</label>

                        <LoadingButton
                            type="submit"
                            loading={loading}
                            loadingPosition="end"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <Link href={ROUTE.signUp}>Quên mật khẩu?</Link>
                            </Grid>
                            <Grid item>
                                Chưa có tài khoản?{" "}
                                <Link href={ROUTE.signUp} color="red">
                                    {"Đăng ký"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
