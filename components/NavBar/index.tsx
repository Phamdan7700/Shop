import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Storefront } from "@mui/icons-material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import LaptopIcon from "@mui/icons-material/Laptop";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WatchIcon from "@mui/icons-material/Watch";
import { Badge, Container, Drawer, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Link from "components/Link";
import SideBar from "components/Sidebar";
import ROUTE from "Helper/Router";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Store } from "utils/Store";
import styles from "../../styles/Header.module.css";

export default function NavBar() {
    const [value, setValue] = React.useState("/");
    const { state, dispatch } = React.useContext(Store);

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    useEffect(() => {
        switch (router.asPath) {
            case ROUTE.laptop:
                setValue(ROUTE.laptop);
                break;
            case ROUTE.smartphone:
                setValue(ROUTE.smartphone);
                break;
            case ROUTE.accessories:
                setValue(ROUTE.accessories);
                break;
            case ROUTE.cart:
                setValue(ROUTE.cart);
                break;
            case ROUTE.news:
                setValue(ROUTE.news);
                break;
            case ROUTE.contact:
                setValue(ROUTE.contact);
                break;

            default:
                setValue(ROUTE.home);
                break;
        }
    }, [router]);
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }

        setOpen(open);
    };

    return (
        <Container>
            <Toolbar sx={{ alignItems: "center" }} id="navbar">
                <Link href={ROUTE.home} height="100%">
                    <Image id="logo" src="/logo.png" width="200" height="80" alt="" objectFit="contain" />
                </Link>
                <Box sx={{ flex: 1, maxWidth:'100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        <Tab
                            label="Laptop"
                            component={Link}
                            icon={<LaptopIcon color="primary" />}
                            href={ROUTE.laptop}
                            value={ROUTE.laptop}
                        />
                        <Tab
                            label="Điện thoại"
                            component={Link}
                            icon={<SmartphoneIcon color="primary" />}
                            href={ROUTE.smartphone}
                            value={ROUTE.smartphone}
                        />
                        <Tab
                            label="Phụ kiện"
                            component={Link}
                            icon={<WatchIcon color="primary" />}
                            href={ROUTE.accessories}
                            value={ROUTE.accessories}
                        />

                        <Tab
                            label="Giỏ hàng"
                            component={Link}
                            icon={<Storefront color="primary" />}
                            href={ROUTE.cart}
                            value={ROUTE.cart}
                        />
                        <Tab
                            label="Tin Tức"
                            component={Link}
                            icon={<AnnouncementIcon color="primary" />}
                            href={ROUTE.news}
                            value={ROUTE.news}
                        />
                        <Tab
                            label="Liên Hệ"
                            component={Link}
                            icon={<RecentActorsIcon color="primary" />}
                            href={ROUTE.contact}
                            value={ROUTE.contact}
                        />
                    </Tabs>
                </Box>
                <Box className={styles.socials}>
                    <IconButton onClick={toggleDrawer(true)}>
                        <Badge badgeContent={state.shoppingCart.countItem} color="error" showZero>
                            <FontAwesomeIcon icon={faShoppingCart} style={{ color: "#000" }} />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>

            <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
                <Stack spacing={2}>
                    <SideBar shoppingCart={state.shoppingCart} onClose={toggleDrawer(false)} />
                </Stack>
            </Drawer>
        </Container>
    );
}
