import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import React from "react";
import { theme } from "utils/CustomTheme";
import StoreProvider from "utils/Store";
import Layout from "../components/Layouts";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    const themes = {
        light: {
            foreground: "#000000",
            background: "#eeeeee",
        },
        dark: {
            foreground: "#ffffff",
            background: "#222222",
        },
    };
    const notistackRef = React.createRef<SnackbarProvider>();
    const onClickDismiss = (key: number | string) => () => {
        notistackRef?.current?.closeSnackbar(key);
    };

    const ThemeContext = React.createContext(themes.light);

    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
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
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SnackbarProvider>
            </ThemeProvider>
        </StoreProvider>
    );
}
export default MyApp;
