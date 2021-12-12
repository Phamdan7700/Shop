import {
    Box,
    Breadcrumbs,
    Chip,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Layout from "components/Layouts";
import Head from "next/head";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ROUTE from "Helper/Router";
import Link from "components/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

interface IFormInputs {
    name: string;
    email: string;
    subject: string;
    content: string;
}
export default function Contact() {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        watch,
    } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = (formData) => {
        
    };
    return (
        <Layout>
            <Head>
                <title>Liên hệ </title>
            </Head>
            <Container>
                <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
                    <Breadcrumbs sx={{ pl: 2 }}>
                        <Chip
                            color="info"
                            component={Link}
                            label="Trang Chủ"
                            icon={<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                            href={ROUTE.home}
                            clickable
                        />
                        <Chip label="Liên hệ" />
                    </Breadcrumbs>
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-evenly">
                            <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> Huế Road
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faPhoneAlt} /> 0123.456.789
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faEnvelope} /> email@email.com
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faGlobe} /> shop.com
                            </div>
                        </Stack>
                        <Divider sx={{ mt: 2, mb: 2 }} color="info"/>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                            <Typography variant="h5" align="center" sx={{ mb: 3 }} fontWeight={'bold'}>
                                Liên hệ với chúng tôi
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
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
                                                helperText={errors.name?.message}
                                                error={Boolean(errors.name)}
                                                {...field}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
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
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        name="subject"
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Vui lòng nhập chủ đề" },
                                            maxLength: { value: 255, message: "Nội dung quá dài" },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                id="subject"
                                                label="Chủ đề"
                                                helperText={errors.subject?.message}
                                                error={Boolean(errors.subject)}
                                                {...field}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="content"
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Vui lòng nhập nội dung" },
                                            maxLength: { value: 1000, message: "Nội dung quá dài" },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                multiline
                                                id="content"
                                                label="Nội dung"
                                                helperText={errors.content?.message}
                                                error={Boolean(errors.content)}
                                                {...field}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Box component="div" sx={{ textAlign: "center" }}>
                                <LoadingButton
                                    type="submit"
                                    // loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: 200 }}
                                >
                                    Gửi
                                </LoadingButton>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 5 }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.414616966958!2d107.58444719169697!3d16.457887905211965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a147ba6bdbff%3A0x2e605afab4951ad9!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEPDtG5nIG5naGnhu4dwIEh14bq_!5e0!3m2!1svi!2s!4v1639212001186!5m2!1svi!2s"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                loading="lazy"
                            ></iframe>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Layout>
    );
}
