import "animate.css";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.css";
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

interface slider {
    id: number;
    img: string;
    position: number;
}
function Slider({ sliders }: { sliders: slider[] }) {
    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            showDots={true}
            swipeable={true}
            draggable={true}
            // ssr={true}
            autoPlaySpeed={3500}
        >
            {sliders.map((slider, index) => (
                <div key={index} className={styles.slider}>
                    <Image draggable={false} src={slider.img} layout="fill" objectFit="cover" alt="" />
                </div>
            ))}
        </Carousel>
    );
}

export default Slider;
