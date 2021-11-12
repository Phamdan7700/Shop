import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header";

interface Props {
    window?: () => Window;
    children: React.ReactNode;
}

export default function Layout(props: Props) {
    return (
        <>
            <Header />
            <main style={{minHeight: '100vh', paddingTop: '140px'}}>{props.children}</main>
            <Footer />
        </>
    );
}
