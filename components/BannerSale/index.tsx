import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { Button, Stack, Typography } from "@mui/material";
function BannerSale() {
    return (
        <div>
            <div className={styles.banner}>
                <Image src="/xhotdeal.png.pagespeed.ic.523j9s2i8G.webp" layout="fill" alt="" />
                <Stack className={styles.textWrap} spacing={2}>
                    <Stack direction="row">
                        <div className={styles.time}>10 days</div>
                        <div className={styles.time}>02 hours</div>
                        <div className={styles.time}>25 mins</div>
                        <div className={styles.time}>06 secs</div>
                    </Stack>
                    <Typography variant="h4" fontWeight="bold">HOT DEAL THIS WEEK</Typography>
                    <Typography variant="h5" >NEW COLLECTION UP TO 50% OFF</Typography>
                    <Button variant="contained" sx={{ borderRadius: '20px' }}>Shop Now</Button>
                </Stack>
            </div>
        </div>
    );
}

export default BannerSale;
