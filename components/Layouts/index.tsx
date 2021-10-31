import { Container } from "@mui/material";
import * as React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header";

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

export default function Layout(props: Props) {
    return (
        <>
            <Header />
            <main style={{minHeight: '100vh', marginTop: '64px'}}>{props.children}</main>
            <Footer />
        </>
    );
}
