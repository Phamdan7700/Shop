import { Backdrop } from "@mui/material";
import React from "react";
import { RingLoader } from "react-spinners";

function Loading() {
    return (
        <Backdrop
            sx={{
                backgroundColor:'none',
                position: 'relative',
                width: '100vw',
                height: '100vh',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
        >
            <RingLoader color="rgba(63, 209, 255)" size={100} />
        </Backdrop>
    );
}

export default Loading;
