export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    },
    countInStock: number
}

export interface CartItemType  extends Product {
    amount: number
}

export type AddToCart = (product: Product) => void
export type RemoveFromCart = (product: CartItemType) => void

