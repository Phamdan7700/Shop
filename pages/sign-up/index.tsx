import { LoadingButton } from "@mui/lab";
import { FormControl, FormHelperText, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "components/Link";
import ROUTE from "Helper/Router";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Store } from "utils/Store";
import styles from "./index.module.css";
interface IFormInputs {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    privacy: boolean;
}
export default function SignUp() {
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleLogin = (user: any) => {
        dispatch({ type: "LOGIN_USER", userInfo: user });
        Cookies.set("userInfo", JSON.stringify(user));
        enqueueSnackbar("Đăng ký thành công", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
            onClose: () => {
                router.push(ROUTE.home);
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
        watch,
    } = useForm<IFormInputs>();
    // Handle Sign-up
    const onSubmit: SubmitHandler<IFormInputs> = (formData) => {
        setLoading(true);

        axios
            .post("http://127.0.0.1:8000/api/register", formData)
            .then(function (response) {
                if (response.status == 200) {
                    handleLogin(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
                enqueueSnackbar(error.message, {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
                setLoading(false);
            });
    };

    return (
        <div className={styles.wrapper}>
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
                                required: { value: true, message: "Vui lòng nhập tên của bạn" },
                                maxLength: { value: 255, message: "Tên quá dài" },
                            }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Tên của bạn"
                                    autoFocus
                                    helperText={errors.name?.message}
                                    error={Boolean(errors.name)}
                                    {...field}
                                />
                            )}
                        />
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
                                    inputProps={{ type: "email" }}
                                    helperText={errors.email?.message}
                                    error={Boolean(errors.email)}
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
                        <FormControl error={Boolean(errors.privacy)}>
                            <Controller
                                name="privacy"
                                control={control}
                                defaultValue={false}
                                rules={{
                                    required: { value: true, message: "Vui lòng chọn đồng ý" },
                                }}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="Đồng ý với điều khoản dịch vụ của chúng tôi."
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
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                Bạn đã có tài khoản?{" "}
                                <Link href={ROUTE.signIn}>
                                    <span style={{ color: "red" }}>Đăng nhập</span>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
