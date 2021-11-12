import CloseIcon from "@mui/icons-material/Close";
import { IconButton, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import React from "react";
import { theme } from "utils/CustomTheme";
import StoreProvider from "utils/Store";
import Layout from "../components/Layouts";
import "../styles/globals.css";

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
    const notistackRef = React.createRef<SnackbarProvider>();
    const onClickDismiss = (key: number | string) => () => {
        notistackRef?.current?.closeSnackbar(key);
    };

    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    maxSnack={2}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    ref={notistackRef}
                    action={(key) => (
                        <IconButton onClick={onClickDismiss(key)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                >
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
        </StoreProvider>
    );
}
export default MyApp;
