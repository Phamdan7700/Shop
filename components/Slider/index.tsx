import { Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.css";
import "animate.css";
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

function Slider() {
    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            showDots={true}
            swipeable={true}
            draggable={true}
            ssr={true}
            autoPlaySpeed={3500}
        >
            <div className={styles.slider}>
                <Image draggable={false} src="/banner1.webp" layout="fill" objectFit="cover" alt="" />
            </div>
            <div className={styles.slider}>
                <Image draggable={false} src="/banner2.webp" layout="fill" objectFit="cover" alt="" />
            </div>
            <div className={styles.slider}>
                <Image draggable={false} src="/banner3.webp" layout="fill" objectFit="cover" alt="" />
            </div>
            <div className={styles.slider}>
                <Image draggable={false} src="/banner4.webp" layout="fill" objectFit="cover" alt="" />
            </div>
        </Carousel>
    );
}

export default Slider;
