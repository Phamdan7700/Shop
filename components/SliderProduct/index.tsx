import { Box } from "@mui/system";
import React, { ReactElement, ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

function SliderProduct({ title, children }: { title?: string; children: ReactNode }) {
    return (
        <Box className={styles.wrapper}>
            {title && (
               <h3 className='title'> {title}</h3>
            )}
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                ssr={true}
                autoPlaySpeed={4000}
                pauseOnHover
            >
                {children}
            </Carousel>
        </Box>
    );
}

export default SliderProduct;
