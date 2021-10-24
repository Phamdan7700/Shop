import { Container, Grid, Link, Skeleton, Stack } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import useSWR from 'swr';
import CardProduct from '../components/CardProduct';
import Product from '../Helper/PropTypes';
import Router from '../Helper/Router';

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
              <NextLink href={{
                pathname: Router.product,
                query: { slug: item.id }
              }}
                passHref>
                <a >
                  <CardProduct
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  />
                </a>
              </NextLink>

            </Grid>
          ))
          :
          Array.from(new Array(6)).map((item, index) => (
            <Grid key={index} item xs={2} sm={4} md={4} >
              <Stack spacing={1}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Stack>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default Cart
