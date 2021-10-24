import { Container, Grid, Skeleton } from '@mui/material'
import { minWidth } from '@mui/system';
import React from 'react'
import useSWR from 'swr'
import CardProduct from '../../components/CardProduct';
import Product from '../../Helper/PropTypes';
const fetcher = (url: string) => fetch(url).then(res => res.json())


function Cart() {

  const URL = 'https://fakestoreapi.com/products';
  const { data, error } = useSWR(URL, fetcher)

  if (error) return <div>failed to load</div>

  return (
    <Container>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {data ?
          data.map((item: Product) => (
            <Grid key={item.id} item xs={2} sm={4} md={4} >
              <CardProduct
                title={item.title}
                category={item.category}
                description={item.description}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            </Grid>
          ))
          :
          Array.from(new Array(6)).map((item, index) => (
            <Grid key={index} item xs={2} sm={4} md={4} >
              <CardProduct />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default Cart
