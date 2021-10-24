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
            <main style={{minHeight: '100vh'}}>{props.children}</main>
            <Footer />
        </>
    );
}
