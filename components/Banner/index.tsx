import { Button, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "./index.module.css";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Banner() {
    return (
        <Stack
            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{
                "& > :not(style)": {
                    width: 350,
                    height: 250,
                },
                mt: 5,
                mb: 5,
            }}
        >
            <Card sx={{ maxWidth: "100%" }} className={styles.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        sx={{ objectFit: "contain" }}
                        image="/macbook-air-m1-2020-gray-600x600.jpg"
                        alt=""
                    />
                    <CardContent className={styles.content}>
                        <Typography variant="h5" className={styles.label}>
                            Laptop <br /> Collection
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
            <Card sx={{ maxWidth: "100%" }} className={styles.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        sx={{ objectFit: "contain" }}
                        image="/iphone-13-pro-max-sierra-blue-600x600.jpg"
                        alt=""
                    />
                    <CardContent className={styles.content}>
                        <Typography variant="h5" className={styles.label}>
                            Smartphone <br /> Collection
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
            <Card sx={{ maxWidth: "100%" }} className={styles.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        sx={{ objectFit: "contain" }}
                        image="/samsung-galaxy-watch-3-41mm-bac-thumb-1-1-600x600.jpg"
                        alt=""
                    />
                    <CardContent className={styles.content}>
                        <Typography variant="h5" className={styles.label}>
                            Accessories <br /> Collection
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
        </Stack>
    );
}

export default Banner;
