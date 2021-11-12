import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

function SliderProduct({ children }: { children: ReactElement }) {
    return (
        <Box sx={{ background: "url(/unnamed.png) no-repeat 100% 100% /cover", mt: 5, pb: 5 }}>
            <Typography variant="h3" textAlign="center" pt={5} pb={5}>
                Sản Phẩm Bán Chạy
            </Typography>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                ssr={true}
                autoPlaySpeed={2000}
            >
                {children}
            </Carousel>
        </Box>
    );
}

export default SliderProduct;
