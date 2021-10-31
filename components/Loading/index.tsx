import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { RingLoader } from "react-spinners";

function Loading() {
    return (
        <LoadingOverlay
            active={true}
            spinner={<RingLoader color="rgba(63, 209, 255, 1)" size={100}/>}
            styles={{
                overlay: (base) => ({
                    ...base,
                    background: "#fff",
                }),
            }}
        >
            <p style={{ height: "100vh" }}></p>
        </LoadingOverlay>
    );
}

export default Loading;
