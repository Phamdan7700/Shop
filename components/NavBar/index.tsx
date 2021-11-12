import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Home, ListAlt, Storefront } from "@mui/icons-material";
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
import AnnouncementIcon from '@mui/icons-material/Announcement';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

interface LinkTabProps {
    label?: string;
    href?: string;
    path: string;
}

function LinkTab(props: LinkTabProps) {
    const router = useRouter();

    return (
        <Tab
            sx={{ fontWeight: "bold" }}
            component={"a"}
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
                router.push(props.path);
            }}
            {...props}
        />
    );
}

export default function NavBar() {
    const [value, setValue] = React.useState("/");
    const { state, dispatch } = React.useContext(Store);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    console.log(router);

    useEffect(() => {
        switch (router.asPath) {
            case ROUTE.home:
                setValue(ROUTE.home);
                break;
            case ROUTE.product:
                setValue(ROUTE.product);
                break;
            case ROUTE.cart:
                setValue(ROUTE.cart);
                break;

            default:
                setValue("");
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
            <Toolbar sx={{ height: 100 , alignItems: 'center'}}>
                <Link href={ROUTE.home}height="100">
                    <Image src="/logo.png" width="200" height="100" alt="" objectFit="contain" />
                </Link>
                <Box sx={{ flex: 1 }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Trang chủ" component={Link} icon={<Home />} href={ROUTE.home} value={ROUTE.home} />
                        <Tab
                            label="Sản Phẩm"
                            component={Link}
                            icon={<ListAlt />}
                            href={ROUTE.product}
                            value={"/product"}
                        />
                        <Tab
                            label="Giỏ hàng"
                            component={Link}
                            icon={<Storefront />}
                            href={ROUTE.cart}
                            value={"/cart"}
                        />
                        <Tab
                            label="Tin Tức"
                            component={Link}
                            icon={<AnnouncementIcon />}
                            href={"#"}
                            value={"/cart"}
                        />
                        <Tab
                            label="Liên Hệ"
                            component={Link}
                            icon={<RecentActorsIcon />}
                            href={"#"}
                            value={"/cart"}
                        />
                    </Tabs>
                </Box>
                <Box className={styles.socials}>
                    <IconButton onClick={toggleDrawer(true)}>
                        <Badge badgeContent={state.shoppingCart.countItem} color="error" showZero>
                            <FontAwesomeIcon icon={faShoppingCart} />
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
