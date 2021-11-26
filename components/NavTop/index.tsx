import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faDollarSign, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Link from "components/Link";
import ROUTE from "Helper/Router";
import React from "react";
import { Store } from "utils/Store";
import styles from "../../styles/Header.module.css";

export default function NavTop() {
    const { state, dispatch } = React.useContext(Store);
    const { userInfo } = state;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                            <Link href="#" className={styles.headerIconLink}>
                                <FontAwesomeIcon className={styles.headerIcon} icon={faDollarSign} />
                                {state.shoppingCart.totalPrice}
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
                                        <FontAwesomeIcon icon={faUser} className={styles.headerIcon} /> Xin chào,{" "}
                                        {userInfo.name}
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
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Link href={ROUTE.signUp} className={styles.headerIconLink}>
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
