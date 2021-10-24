import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layouts";
import React, { useContext } from "react";

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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
