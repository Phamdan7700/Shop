import { Container, Grid, Link, List, ListItem, ListItemButton, Typography } from "@mui/material";
import React, { FC } from "react";
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcMastercard, faCcPaypal, faCcVisa, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import styles from '../../styles/Footer.module.css';

const FooterMenu = [
  {
    title: 'ABOUT US',
    sub: [
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.',
        href: '#'
      },
      {
        title: '1734 Stonecoal Road',
        href: '#',
        icon: <RoomIcon fontSize="small" sx={{ color: 'red' }} />
      },
      {
        title: '+021-95-51-84',
        href: '#',
        icon: <PhoneIcon fontSize="small" sx={{ color: 'red' }} />
      },
      {
        title: 'email@email.com',
        href: '#',
        icon: <MailOutlineRoundedIcon fontSize="small" sx={{ color: 'red' }} />
      },
    ]

  },
  {
    title: 'CATEGORIES',
    sub: [
      {
        title: 'Hot deals',
        href: '#'
      },
      {
        title: 'Laptops',
        href: '#'
      },
      {
        title: 'Smartphones',
        href: '#'
      },
      {
        title: 'Cameras',
        href: '#'
      },
      {
        title: 'Accessories',
        href: '#'
      },
    ]


  },
  {
    title: 'INFORMATION',
    sub: [
      {
        title: 'About Us',
        href: '#'
      },
      {
        title: 'Contact Us',
        href: '#'
      },
      {
        title: 'Privacy Policy',
        href: '#'
      },
      {
        title: 'Orders and Returns',
        href: '#'
      },
      {
        title: 'Terms & Conditions',
        href: '#'
      },
    ]

  },
  {
    title: 'SERVICE',
    sub: [
      {
        title: 'My Account',
        href: '#'
      },
      {
        title: 'View Cart',
        href: '#'
      },
      {
        title: 'My Account',
        href: '#'
      },
      {
        title: 'My Account',
        href: '#'
      },
    ]

  },
]
const Footer: FC = () => {
  return (

    <Box component="footer">
      <Box sx={{ bgcolor: '#15161d', color: 'warning.contrastText', p: 6, borderTop: '3px solid red' }}>
        <Container>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {FooterMenu.map((item, index) => (
              <Grid key={index} item xs={2} sm={4} md={3}>
                <Typography component="h3">{item.title}</Typography>
                <List >
                  {item.sub.map((sub, index) => (
                    <ListItem key={index} disableGutters disablePadding className={styles.link}>
                      <ListItemButton disableGutters  >
                        <NextLink href={sub.href} passHref>
                          <Link color="#aaa" underline="none">{sub.icon ? sub.icon : null} {sub.title}</Link>
                        </NextLink>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: '#1e1f29', color: '#aaa', p: 3 }}>
        <Container>
          <Box textAlign="center">
            <FontAwesomeIcon className={styles.card} icon={faCcVisa} />
            <FontAwesomeIcon className={styles.card} icon={faCcMastercard} />
            <FontAwesomeIcon className={styles.card} icon={faCcPaypal} />
            <FontAwesomeIcon className={styles.card} icon={faCreditCard} />
          </Box>

          <Typography variant="body2" align="center" marginTop={2}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {' | '}
            {'All rights reserved '}
            <Link color="inherit" href="#">
              Shoppi
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box >


  );
};

export default Footer;
