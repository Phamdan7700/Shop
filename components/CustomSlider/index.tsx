import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

function CustomSlider({ slider }: { slider: Array<{ src: string }> }) {
    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            showDots={false}
            swipeable={true}
            draggable={true}
            // ssr={true}
            autoPlaySpeed={3500}
        >
            {slider.map((slider, index) => (
                <Image
                    key={index}
                    src={`/img/${slider.src}`}
                    width="1200"
                    height="500"
                    layout="responsive"
                    sizes="100vw"
                    alt=""
                    draggable={false}
                />
            ))}
        </Carousel>
    );
}

export default CustomSlider;
