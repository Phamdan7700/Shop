import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    Button,
    Chip,
    IconButton,
    List,
    ListItem, Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/system";
import ROUTE from "Helper/Router";
import { shoppingCartType } from "Helper/Types";
import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { Store } from "utils/Store";
import CartItemSidebar from "./cart";

interface SidebarType {
    shoppingCart: shoppingCartType;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

function SideBar({ shoppingCart, onClose }: SidebarType) {
    const { state, dispatch } = useContext(Store);

    const router = useRouter();
    const { cart, totalPrice, countItem } = shoppingCart;
    return (
        <Box style={{ minWidth: 400, maxWidth: 400 }}>
            <Typography
                variant="h6"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "bold",
                    p: 2,
                }}
            >
                Giỏ Hàng Của Bạn
                <IconButton onClick={onClose}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </Typography>
            <List>
                {cart.map((item, index) => (
                    <>
                        <CartItemSidebar key={index} item={item} onClose={onClose} />
                        <br />
                        <Divider />
                    </>
                ))}
                <ListItem>
                    <Chip
                        sx={{ width: "100%", fontWeight: "bold" }}
                        label={"Tổng Tiền: " + totalPrice}
                        variant="outlined"
                    ></Chip>
                </ListItem>
                <ListItem>
                    <Button
                        sx={{ width: "100%" }}
                        variant="contained"
                        onClick={(event) => {
                            router.push("/cart");
                            onClose(event);
                        }}
                    >
                        <ShoppingCartIcon sx={{ marginRight: 1 }} /> Xem Giỏ Hàng
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        sx={{ width: "100%" }}
                        disabled={countItem === 0}
                        variant="contained"
                        onClick={(event) => {
                            router.push(ROUTE.checkOut);
                            onClose(event);
                        }}
                    >
                        <LocalShippingIcon sx={{ marginRight: 1 }} /> Đặt Hàng
                    </Button>
                </ListItem>
            </List>
        </Box>
    );
}

export default SideBar;
