
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faDollarSign, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Container, Fab, Link, Zoom } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CartIcon from "components/Cart";
import NextLink from 'next/link';
import React from 'react';
import { Store } from "utils/Store";
import styles from '../../styles/Header.module.css';
import NavTabs from "../Nav-top";


interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function ScrollTop(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector("#back-to-top-anchor");

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
export default function Header() {
    const { state, dispatch } = React.useContext(Store);

    return (
        <>
            <CssBaseline />
            <HideOnScroll >
                <AppBar color="default">
                    <Box sx={{ bgcolor: 'primary.main', flexGrow: 1, borderBottom: '2px solid red' }}>
                        <Container>
                            <Typography sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <NextLink href="#" passHref>
                                        <Link className={styles.headerIconLink} underline='none'>
                                            <FontAwesomeIcon className={styles.headerIcon} icon={faPhoneAlt} /> +021-95-51-84
                                        </Link>
                                    </NextLink>
                                    <NextLink href="#" passHref>
                                        <Link className={styles.headerIconLink} underline='none'>
                                            <FontAwesomeIcon className={styles.headerIcon} icon={faEnvelope} />  email@email.com
                                        </Link>
                                    </NextLink>
                                    <NextLink href="#" passHref>
                                        <Link className={styles.headerIconLink} underline='none'>
                                            <FontAwesomeIcon className={styles.headerIcon} icon={faMapMarkerAlt} /> 1734 Stonecoal Road
                                        </Link>
                                    </NextLink>
                                </Box>
                                <Box>
                                    <NextLink href="#" passHref>
                                        <Link className={styles.headerIconLink} underline='none'>
                                            <FontAwesomeIcon className={styles.headerIcon} icon={faDollarSign} />  USD
                                        </Link>
                                    </NextLink>
                                    <NextLink href="#" passHref>
                                        <Link className={styles.headerIconLink} underline='none'>
                                            <FontAwesomeIcon className={styles.headerIcon} icon={faUser} />  My Account
                                        </Link>
                                    </NextLink>
                                </Box>
                            </Typography>
                        </Container>
                    </Box>

                    <Container>
                        <Toolbar>
                            <Typography variant="h6" component="div">
                                <NextLink href="/"><a>Shoppi</a></NextLink>
                            </Typography>
                            <NavTabs />
                            <Box className={styles.socials}>
                                <CartIcon quantity={state.countItem} />
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Toolbar id="back-to-top-anchor" />
            <ScrollTop >
                <Fab color="primary" size="small" aria-label="scroll back to top" >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    )
}


