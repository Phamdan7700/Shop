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
            <Container style={{minHeight: '100vh'}}>{props.children}</Container>
            <Footer />
        </>
    );
}
