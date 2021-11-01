const ROUTE = {
    product: function (slug: string | number) {
        return "/product/" + slug;
    },
    cart: "/cart",
    signUp: '/sign-up',
    signIn: '/sign-in',
};
export default ROUTE;
