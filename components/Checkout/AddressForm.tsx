import { MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import API from "Helper/api";
import axiosClient from "Helper/API/AxiosClient";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
    name: string;
    phone: number;
    province: string;
    district: string;
    ward: string;
    village: string;
}

interface ProvinceType {
    id: number;
    name: string;
}
interface DistrictType {
    id: number;
    name: string;
}
interface WardType {
    id: number;
    name: string;
}

interface PropType {
    onFormSubmit: (data: IFormInputs) => void;
    formData: IFormInputs | null;
}
export default function AddressForm({ onFormSubmit, formData }: PropType) {
    // Form
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IFormInputs>();
    // API
    const [provinces, setProvinces] = useState<ProvinceType[]>([]);
    const [districts, setDistricts] = useState<DistrictType[]>([]);
    const [wards, setWards] = useState<WardType[]>([]);

    const watchProvince = watch("province");
    const watchDistrict = watch("district");
    const [currentProvince, setCurrentProvince] = useState<ProvinceType | null>(null);
    const [currentDistrict, setCurrentDistrict] = useState<DistrictType | null>(null);
    //Get API
    useEffect(() => {
        axiosClient.get(API.provinces).then((response) => {
            setProvinces(response.data);
        });
    }, []);

    useEffect(() => {
        if (watchProvince) {
            const province = JSON.parse(watchProvince) as ProvinceType;
            setCurrentProvince(province);
            axiosClient.get(API.getDistricts(province.id ?? currentProvince?.id)).then((response) => {
                setDistricts(response.data);
                setWards([]);
            });
        }
    }, [watchProvince]);

    useEffect(() => {
        if (watchDistrict) {
            const district = JSON.parse(watchProvince) as DistrictType;
            setCurrentDistrict(district);
            axiosClient.get(API.getWards(district.id ?? currentDistrict?.id)).then((response) => {
                setWards(response.data);
            });
        }
    }, [watchDistrict]);

    // Handle Form
    const onSubmit: SubmitHandler<IFormInputs> = (formData) => {
        onFormSubmit(formData);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                ?????a ch??? giao h??ng
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} id="AddressForm">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng nh???p t??n c???a b???n" },
                                maxLength: { value: 255, message: "T??n qu?? d??i" },
                            }}
                            render={({ field }) => (
                                <TextField
                                    defaultValue={formData?.name}
                                    fullWidth
                                    id="name"
                                    label="H??? v?? t??n"
                                    autoFocus
                                    helperText={errors.name?.message}
                                    error={Boolean(errors.name)}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng nh???p s??? ??i???n tho???i" },
                                maxLength: { value: 20, message: "S??? ??i???n tho???i kh??ng h???p l???" },
                                pattern: {
                                    value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                                    message: "S??? ??i???n tho???i kh??ng h???p l???",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    defaultValue={formData?.phone}
                                    fullWidth
                                    label="S??? ??i???n tho???i"
                                    helperText={errors.phone?.message}
                                    error={Boolean(errors.phone)}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="province"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng ch???n t???nh, th??nh ph???" },
                            }}
                            render={({ field }) => (
                                <TextField
                                    defaultValue={formData?.province}
                                    fullWidth
                                    label="T???nh, th??nh ph???"
                                    helperText={errors.province?.message}
                                    error={Boolean(errors.province)}
                                    select
                                    {...field}
                                >
                                    {provinces.map((province, index) => (
                                        <MenuItem
                                            key={index}
                                            value={JSON.stringify({ id: province.id, name: province.name })}
                                        >
                                            {province.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="district"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng ch???n qu???n, huy???n" },
                            }}
                            render={({ field }) => (
                                <TextField
                                    defaultValue={formData?.district}
                                    fullWidth
                                    label="Qu???n, Huy???n"
                                    helperText={errors.district?.message}
                                    error={Boolean(errors.district)}
                                    select
                                    {...field}
                                >
                                    {districts.map((district, index) => (
                                        <MenuItem
                                            key={index}
                                            value={JSON.stringify({ id: district.id, name: district.name })}
                                        >
                                            {district.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="ward"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng ch???n x??, ph?????ng" },
                            }}
                            render={({ field }) => (
                                <TextField
                                    defaultValue={formData?.ward}
                                    fullWidth
                                    label="X??, Ph?????ng"
                                    helperText={errors.ward?.message}
                                    error={Boolean(errors.ward)}
                                    select
                                    {...field}
                                >
                                    {wards.map((ward, index) => (
                                        <MenuItem key={index} value={JSON.stringify({ id: ward.id, name: ward.name })}>
                                            {ward.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="village"
                            control={control}
                            rules={{
                                required: { value: true, message: "Vui l??ng nh???p ?????a ch??? " },
                            }}
                            render={({ field }) => (
                                <TextField
                                    defaultValue={formData?.village}
                                    fullWidth
                                    label="?????a ch??? c??? th???"
                                    helperText={errors.village?.message}
                                    error={Boolean(errors.village)}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
