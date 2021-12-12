import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import { Button, Stack, Step, StepLabel, Stepper, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Image from "next/image";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { Check } from "@mui/icons-material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import { StepIconProps } from "@mui/material/StepIcon";

const steps = ["Mở Ví MoMo, chọn “Quét Mã”", "Quét mã QR", "Nhập số tiền cần thanh toán", "Kiểm tra & Bấm “Xác nhận”"];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));
const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
}));
const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
}));
function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <LooksOneIcon />,
        2: <LooksTwoIcon />,
        3: <Looks3Icon />,
        4: <Looks4Icon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}
interface IFormInputs {
    name: string;
    phone: number;
    province: string;
    district: string;
    ward: string;
    village: string;
}
interface PropType {
    onFormSubmit: (data: IFormInputs|null) => void;
    formData: IFormInputs | null;
}
export default function PaymentForm({ onFormSubmit, formData }: PropType) {
    const [value, setValue] = React.useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <Box
                id="PaymentForm"
                component={"form"}
                onSubmit={(value: any) => {
                    onFormSubmit(null);
                }}
                sx={{ width: "100%", typography: "body1" }}
            >
                <Typography variant="h6" gutterBottom>
                    Phương thức thanh toán
                </Typography>
                <TabContext value={value}>
                    <TabList onChange={handleChange}>
                        <Tab icon={<Image src="/img/credit_cards.png" alt="" width={30} height={30} />} value="1" />
                        <Tab icon={<Image src="/img/logo-momo.png" alt="" width={30} height={30} />} value="2" />
                        <Tab icon={<Image src="/img/zalo-pay.jpg" alt="" width={30} height={30} />} value="3" />
                    </TabList>
                    <TabPanel value="1">
                        <form>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        id="cardName"
                                        label="Name on card"
                                        fullWidth
                                        autoComplete="cc-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        id="cardNumber"
                                        label="Card number"
                                        fullWidth
                                        autoComplete="cc-number"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        id="expDate"
                                        label="Expiry date"
                                        fullWidth
                                        autoComplete="cc-exp"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        id="cvv"
                                        label="CVV"
                                        helperText="Last three digits on signature strip"
                                        fullWidth
                                        autoComplete="cc-csc"
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </TabPanel>
                    <TabPanel value="2">
                        <Typography variant="h6" gutterBottom>
                            Hướng dẫn thanh toán bằng hình thức Quét Mã
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Stack sx={{ width: "100%" }} spacing={4}>
                                <Stepper alternativeLabel activeStep={4} connector={<ColorlibConnector />}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Stack>
                        </Box>
                        <Box sx={{ position: "relative", width: 200, height: 200, m: "auto" }}>
                            <Image src="/img/qr-code.svg" alt="" layout="fill" />
                        </Box>
                    </TabPanel>
                    <TabPanel value="3">
                        <Typography variant="h6" gutterBottom>
                            Hướng dẫn thanh toán bằng hình thức Quét Mã
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Stack sx={{ width: "100%" }} spacing={4}>
                                <Stepper alternativeLabel activeStep={4} connector={<ColorlibConnector />}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Stack>
                        </Box>
                        <Box sx={{ position: "relative", width: 200, height: 200, m: "auto" }}>
                            <Image src="/img/qr-code-1.svg" alt="" layout="fill" />
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </React.Fragment>
    );
}
