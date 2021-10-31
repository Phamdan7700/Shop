import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layouts";
import React, { useContext } from "react";
import StoreProvider from "utils/Store";
import { ThemeProvider } from "@mui/private-theming";
import { theme } from "utils/CustomTheme";

function MyApp({ Component, pageProps }: AppProps) {

  const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
  };

  const ThemeContext = React.createContext(themes.light);

  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StoreProvider>
  );
}
export default MyApp;
