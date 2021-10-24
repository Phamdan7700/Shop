import { Container, Grid, Skeleton } from '@mui/material'
import { minWidth } from '@mui/system';
import React from 'react'
import useSWR from 'swr'
import CardProduct from '../../components/CardProduct';
import Product from '../../Helper/PropTypes';
const fetcher = (url: string) => fetch(url).then(res => res.json())


function Cart() {

  return null
}

export default Cart
