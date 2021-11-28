import { CloseOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Link, Stack, TableCell, TableRow, TextField } from "@mui/material";
import AlertDialogRemoveCart from "components/Alert/RemoveCart";
import { formatNumber } from "Helper/function";
import ROUTE from "Helper/Router";
import { CartItemType } from "Helper/Types";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import styles from "./index.module.css";
interface PropType {
    item: CartItemType;
    addToCart: (item: CartItemType) => void;
    removeFromCart: (item: CartItemType, amount: number) => void;
}

function CartItem({ item, addToCart, removeFromCart }: PropType) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (item.amount === 1) {
            setOpen(true);
            return;
        }
        removeFromCart(item, 1);
    };

    const handleCloseOK = () => {
        setOpen(false);
        removeFromCart(item, item.amount);
    };

    const handleCloseCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ minWidth: 100 }}>
                    <NextLink href={ROUTE.getProduct(item.id)} passHref>
                        <Link>
                            <Image src={item.thumbnail} width="100" height="100" alt="" objectFit="contain" />
                        </Link>
                    </NextLink>
                </TableCell>
                <TableCell>
                    <NextLink href={ROUTE.getProduct(item.id)} passHref>
                        <Link>{item.name}</Link>
                    </NextLink>
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" , fontWeight:'bold'}}>
                    {formatNumber(item.price)} <span>đ</span>
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Stack direction="row" className={styles.amountWrap}>
                        <IconButton
                            className={styles.btnAmount}
                            size="small"
                            onClick={handleClickOpen}
                            disabled={item.amount === 0}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            size="small"
                            className={styles.amount}
                            value={item.amount}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                        ></TextField>
                        <IconButton
                            className={styles.btnAmount}
                            size="small"
                            onClick={() => addToCart(item)}
                            disabled={item.amount === item.count_in_sock}
                        >
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", fontWeight:'bold' }}>
                    {formatNumber(item.price * item.amount)} <span>đ</span>
                </TableCell>
                <TableCell>
                    <IconButton
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <CloseOutlined />
                    </IconButton>
                </TableCell>
            </TableRow>

            <AlertDialogRemoveCart open={open} onOK={handleCloseOK} onCancel={handleCloseCancel} />
        </>
    );
}

export default CartItem;
