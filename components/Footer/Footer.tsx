import { Link, Typography } from "@mui/material";
import React, { FC } from "react";
import Box from '@mui/material/Box';


const Footer: FC = () => {
  return (
    <Box sx={{  bgcolor: 'warning.main', color: 'warning.contrastText', p: 6, mt: 2 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Shoppi
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          Shoppi 
        </Link>{' '} 
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;
