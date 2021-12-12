import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faDollarSign, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Container, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Link from "components/Link";
import API from "Helper/api";
import axiosClient from "Helper/API/AxiosClient";
import getCsrfCookies from "Helper/API/getCsrfCookies";
import { formatNumber } from "Helper/function";
import ROUTE from "Helper/Router";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { Store } from "utils/Store";
import styles from "../../styles/Header.module.css";

export default function NavTop() {
    const router = useRouter();
    const { state, dispatch } = React.useContext(Store);
    const [userInfo, setUserInfo] = React.useState(() => {
        return Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")!) : null;
    });
    const token = Cookies.get("auth_token") ? JSON.parse(Cookies.get("auth_token")!) : "";

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        handleClose();
        getCsrfCookies().then(() => {
            axiosClient
                .post(API.logout)
                .then(function (response) {
                    if (response.data.success) {
                        Cookies.remove("userInfo");
                        Cookies.remove("auth_token");
                        setUserInfo(null);
                        enqueueSnackbar(response.data.message, {
                            variant: "success",
                            autoHideDuration: 2000,
                            anchorOrigin: { vertical: "top", horizontal: "center" },
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error.response);
                    router.push(ROUTE.signIn)
                });
        });
    };

    return (
        <>
            <Box
                sx={{
                    bgcolor: "primary.main",
                    flexGrow: 1,
                    borderBottom: "2px solid red",
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                        id="nav-top"
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Link href="#" className={styles.headerIconLink}>
                                <FontAwesomeIcon className={styles.headerIcon} icon={faPhoneAlt} /> 0123.456.789
                            </Link>

                            <Link href="#" className={styles.headerIconLink}>
                                <FontAwesomeIcon className={styles.headerIcon} icon={faEnvelope} /> email@email.com
                            </Link>

                            <Link href="#" className={styles.headerIconLink}>
                                <FontAwesomeIcon className={styles.headerIcon} icon={faMapMarkerAlt} /> Huế Road
                            </Link>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <Link href={ROUTE.cart} className={styles.headerIconLink}>
                                <FontAwesomeIcon className={styles.headerIcon} icon={faDollarSign} />
                                {formatNumber(state.shoppingCart.totalPrice)} <span>đ</span>
                            </Link>

                            {userInfo ? (
                                <>
                                    <Button
                                        id="basic-button"
                                        aria-controls="basic-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                        className={styles.headerIconLink}
                                    >
                                        <Avatar
                                            sx={{ bgcolor: "orangered", width: 30, height: 30 }}
                                            alt={userInfo.name}
                                        />
                                        <span style={{ marginLeft: 5 }}>{userInfo.name}</span>
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <AccountBoxIcon /> Profile
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <LogoutIcon /> Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Link href={ROUTE.signIn} className={styles.headerIconLink}>
                                    <FontAwesomeIcon className={styles.headerIcon} icon={faUser} /> My Account
                                </Link>
                            )}
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
