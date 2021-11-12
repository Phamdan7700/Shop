import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, TextField } from "@mui/material";
import AlertDialogRemoveCart from "components/Alert/RemoveCart";
import ROUTE from "Helper/Router";
import { CartItemType } from "Helper/Types";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Store } from "utils/Store";
import styles from "./index.module.css";

interface PropType {
    item: CartItemType;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

function CartItemSidebar({ item, onClose }: PropType) {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (item.amount === 1) {
            setOpen(true);
            return;
        }
        dispatch({
            type: "REMOVE_TO_CART",
            payload: { ...item, amount: 1 },
        });
    };

    const handleCloseOK = () => {
        setOpen(false);
        dispatch({
            type: "REMOVE_TO_CART",
            payload: { ...item, amount: item.amount },
        });
        console.log('handleCloseOK');
        
    };

    const handleCloseCancel = () => {
        setOpen(false);
        console.log('handleCloseCancel');

    };

    return (
        <>
            <ListItem
                button={true}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                        <DeleteForeverIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar
                    onClick={(event) => {
                        router.push(ROUTE.getProduct(item.id));
                        onClose(event);
                    }}
                >
                    <Avatar src={item.image} sx={{ width: 50, height: 50 }} variant="square" />
                </ListItemAvatar>
                <ListItemText
                    primary={item.title}
                    secondary={item.amount + " X " + item.price}
                    onClick={(event) => {
                        router.push(ROUTE.getProduct(item.id));
                        onClose(event);
                    }}
                />
            </ListItem>
            <ListItem>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        className={styles.btnAmount}
                        size="small"
                        onClick={handleClickOpen}
                        disabled={item.amount === 0}
                        color="primary"
                    >
                        <RemoveIcon />
                    </Button>
                    <TextField
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        size="small"
                        className={styles.amount}
                        value={item.amount}
                        //   onChange={handleUpdateItem}
                    ></TextField>
                    <Button
                        variant="outlined"
                        className={styles.btnAmount}
                        size="small"
                        onClick={() => dispatch({ type: "ADD_TO_CART", payload: { ...item, amount: 1 } })}
                        color="primary"
                        disabled={item.amount === item.countInStock}
                    >
                        <AddIcon />
                    </Button>
                </Stack>
            </ListItem>

            <AlertDialogRemoveCart open={open} onOK={handleCloseOK} onCancel={handleCloseCancel} />
        </>
    );
}

export default CartItemSidebar;
