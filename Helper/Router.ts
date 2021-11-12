const ROUTE = {
    home: '/',
    product: '/product',
    getProduct: function (slug: string | number) {
        return "/product/" + slug;
    },
    cart: "/cart",
    signUp: '/sign-up',
    signIn: '/sign-in',
    checkOut: '/check-out',
};
export default ROUTE;
