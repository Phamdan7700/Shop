import { Backdrop } from "@mui/material";
import React from "react";
import { RingLoader } from "react-spinners";

function Loading() {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
        >
            <RingLoader color="rgba(63, 209, 255, 1)" size={100} />
        </Backdrop>
    );
}

export default Loading;
