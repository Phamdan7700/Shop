export interface Product {
    id: number;
    name: string;
    manufacturer: string;
    price: number;
    price_sale: number;
    content: string;
    detail: string;
    category: string;
    thumbnail: string;
    img_list: Array<string>;
    count_in_sock: number;
    rating: {
        rate: number;
        count: number;
    };
}

export interface Category {
    id: number;
    title: string;
    products: Array<Product>;
}

export interface shoppingCartType {
    cart: CartItemType[];
    countItem: number;
    totalPrice: number;
    shippingFee: number;
}

export interface CartItemType {
    id: number;
    name: string;
    manufacturer: string;
    price: number;
    price_sale: number;
    category: string;
    thumbnail: string;
    count_in_sock: number;
    rating: {
        rate: number;
        count: number;
    };
    amount: number
}

export type AddToCart = (product: Product) => void;
export type RemoveFromCart = (product: CartItemType) => void;

export interface UserType {
    name: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    summary: string;
    content: string;
    thumbnail: string;
    view: number;
    created_at: Date;
    updated_at: Date;
}
