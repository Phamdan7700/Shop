import { Breadcrumbs, Container, Link, Skeleton } from '@mui/material';
import Product from 'Helper/PropTypes';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import useSWR, { SWRResponse } from 'swr';
import HomeIcon from '@mui/icons-material/Home';
import NextLink from 'next/link';
import Image from 'next/image';
import { Box } from '@mui/system';
import { GetStaticPaths, GetStaticProps } from 'next';

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface DetailProps {
    data: Product,
    error?: any
}

export default function ProductPage({ data }: DetailProps) {
    const router = useRouter()
    const { slug } = router.query
    const URL = `https://fakestoreapi.com/products/${slug}`;
    const { data, error }: SWRResponse<Product, Error> = useSWR(URL, fetcher)


    // if (error) return <div>failed to load</div>
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


// export const getStaticProps: GetStaticProps = async (context) => {
//     // Call an external API endpoint to get posts
//     const res = await fetch('https://fakestoreapi.com/products')
//     const data = await res.json()

//     // Get the paths we want to pre-render based on posts
//     const paths = data.map((item: Product) => ({
//         params: { slug: item.id },
//     }))

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
// }

// export const getStaticPaths: GetStaticPaths = async ({ params }) => {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://fakestoreapi.com/products/${params?.slug}`)
//     const data = await res.json()

//     // Pass post data to the page via props
//     return { props: { data } }
// }
