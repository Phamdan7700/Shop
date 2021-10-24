import { Breadcrumbs, Container, Link, Skeleton } from '@mui/material';
import Product from 'Helper/PropTypes';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import useSWR, { SWRResponse } from 'swr';
import HomeIcon from '@mui/icons-material/Home';
import NextLink from 'next/link';
import Image from 'next/image';
import { Box } from '@mui/system';

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface DetailProps {
    data: Product,
    error?: any
}

function ProductPage() {
    const router = useRouter()
    const { slug } = router.query
    const URL = `https://fakestoreapi.com/products/${slug}`;
    const { data, error }: SWRResponse<Product, Error> = useSWR(URL, fetcher)


    if (error) return <div>failed to load</div>
    if (!data) return <Container>
        <Skeleton height={300} />
    </Container>

    return (
        <Container>
            <Breadcrumbs>
                <NextLink href="/" passHref>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="red"
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        MUI
                    </Link>
                </NextLink>
            </Breadcrumbs>
            <Box>
                <h1>{data.id}</h1>
                <h1>{data.description}</h1>
                <Image src={data.image} alt="img" width={200} height={200} layout="responsive" />
            </Box>
        </Container>
    )
}

export default ProductPage

