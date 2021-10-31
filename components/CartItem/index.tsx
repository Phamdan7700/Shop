import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    IconButton,
    Link,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import ROUTE from "Helper/Router";
import { CartItemType } from "Helper/Types";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import styles from "./index.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
interface PropType {
    item: CartItemType;
    addToCart: (item: CartItemType) => void;
    removeFromCart: (item: CartItemType, amount: number) => void;
}

function CartItem({ item, addToCart, removeFromCart }: PropType) {
    //   const [amount, setAmount] = useState<number>(item.amount);
    // function handleUpdateItem(e: BaseSyntheticEvent) {
    //     const newAmount: number = e.target.value;
    //     if (newAmount >= 0) {
    //         setAmount(Number(newAmount));
    //     }
    //     addToCart({ ...item, amount: newAmount });
    // }

    return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
                <NextLink href={ROUTE.product(item.id)} passHref>
                    <Link>
                        <Image
                            src={item.image}
                            width="100"
                            height="100"
                            alt=""
                            objectFit="contain"
                        />
                    </Link>
                </NextLink>
            </TableCell>
            <TableCell>
                <NextLink href={ROUTE.product(item.id)}>{item.title}</NextLink>
            </TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell sx={{ whiteSpace: "nowrap" }}>
                <IconButton
                    className={styles.btnAmount}
                    size="small"
                    onClick={() => {
                        removeFromCart(item, 1);
                    }}
                    disabled={item.amount === 0}
                    color="error"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </IconButton>
                <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    size="small"
                    className={styles.amount}
                    value={item.amount}
                    //   onChange={handleUpdateItem}
                ></TextField>
                <IconButton
                    className={styles.btnAmount}
                    size="small"
                    onClick={() => addToCart(item)}
                    color="error"
                    disabled={item.amount === item.countInStock}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </IconButton>
            </TableCell>
            <TableCell sx={{ width: 100 }}>
                ${(item.price * item.amount).toFixed(2)}
            </TableCell>
            <TableCell>
                <IconButton color="error" onClick={() => {removeFromCart(item, item.amount)}}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default CartItem;
