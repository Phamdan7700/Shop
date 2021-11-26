import Subscriber from "components/Subscriber";
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
            <main id='main'>{props.children}</main>
             {/* Subscriber */}
             <Subscriber />
            <Footer />
        </>
    );
}
