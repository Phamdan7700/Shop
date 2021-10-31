import React from 'react'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

function CartIcon({quantity}: {quantity: number}) {
    return (
        <div style={{display: 'flex'}}>
            <LocalMallOutlinedIcon />
            <Typography sx={{ml: 1}}><span style={{marginRight: 5, fontWeight: 'bold'}}>Cart</span>({quantity})</Typography>
        </div>
    )
}

export default CartIcon
