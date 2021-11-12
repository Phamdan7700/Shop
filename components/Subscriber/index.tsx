import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./index.module.css";

export default function Subscriber() {
    return (
        <div className={styles.subscriber}>
            <Box className={styles.content}>
                <Typography variant="h6">Đăng ký nhận thông tin khuyến mãi</Typography>
                <FormControl sx={{ mt: 1 }}>
                    <Stack direction={{ xs: "column", sm: "column", md: "row" }} alignItems="center">
                        <TextField
                            className={styles.input}
                            placeholder="Email"
                            variant="standard"
                            InputProps={{ disableUnderline: true, type: 'email' }}
                            required
                        />
                        <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained" className={styles.button}>
                            Subscriber
                        </Button>
                    </Stack>
                </FormControl>
            </Box>
        </div>
    );
}
