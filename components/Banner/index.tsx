import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "./index.module.css";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ROUTE from "Helper/Router";

const banner = [
    {
        title: "Laptop",
        img: "/macbook-air-m1-2020-gray-600x600.jpg",
        href: ROUTE.laptop,
    },
    {
        title: "Smartphone",
        img: "/iphone-13-pro-max-sierra-blue-600x600.jpg",
        href: ROUTE.smartphone,
    },
    {
        title: "Accessories",
        img: "/samsung-galaxy-watch-3-41mm-bac-thumb-1-1-600x600.jpg",
        href: ROUTE.accessories,
    },
];
function Banner() {
    const router = useRouter();
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {banner.map((item, index) => (
                <Grid key={index} item xs={12} sm={12} md={4}>
                    <Card
                        sx={{ maxWidth: "100%" }}
                        className={styles.card}
                        onClick={() => {
                            router.push(item.href);
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                sx={{ objectFit: "contain" }}
                                image={item.img}
                                alt=""
                            />
                            <CardContent className={styles.content}>
                                <Typography variant="h5" className={styles.label}>
                                    {item.title}
                                </Typography>
                                <br />
                                <Button variant="contained" color="secondary">
                                    SHOP NOW{" "}
                                    <span className="animate__animated animate__fadeInLeft animate__infinite">
                                        <span className={styles.arrow}></span> <FontAwesomeIcon icon={faArrowRight} />
                                    </span>
                                </Button>
                            </CardContent>
                            <div className={styles.overlay}></div>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Banner;
