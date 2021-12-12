import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Store } from "utils/Store";
import { formatNumber } from "Helper/function";
import { Avatar, ListItemAvatar } from "@mui/material";

const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: "Pham Dan" },
    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
];
interface IFormInputs {
    name: string;
    phone: number;
    province: string;
    district: string;
    ward: string;
    village: string;
}
interface PropType {
    onFormSubmit: (data: IFormInputs | null) => void;
    formData: IFormInputs | null;
}
export default function Review({ onFormSubmit, formData }: PropType) {
    const {
        state: { shoppingCart },
    } = React.useContext(Store);
    const { cart } = shoppingCart;
    const { name, phone, province, district, ward, village } = formData as IFormInputs;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Chi tiết đơn hàng
            </Typography>
            <List disablePadding>
                {cart.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemAvatar>
                            <Avatar src={product.thumbnail} variant="square" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.name}
                            secondary={`${product.amount} x ${formatNumber(
                                product.price_sale > 0 ? product.price_sale : product.price
                            )} đ`}
                        />
                        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                            {formatNumber(
                                product.amount * (product.price_sale > 0 ? product.price_sale : product.price)
                            )}{" "}
                            <span>đ</span>
                        </Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Tổng tiền" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {formatNumber(shoppingCart.totalPrice)} <span>đ</span>
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Địa chỉ giao hàng:
                    </Typography>
                    <Typography gutterBottom>Khách hàng: {name} </Typography>
                    <Typography gutterBottom>Số điện thoại: {phone} </Typography>
                    <Typography gutterBottom>
                        Địa chỉ:{" "}
                        {`${village}, ${JSON.parse(ward)?.name}, ${JSON.parse(district)?.name}, ${
                            JSON.parse(province)?.name
                        }`}
                    </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Thông tin thanh toán
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <form
                id="Review"
                onSubmit={(value: any) => {
                    onFormSubmit(null);
                }}
            ></form>
        </React.Fragment>
    );
}
