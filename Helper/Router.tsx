const ROUTE = {
    product: function (slug: string | number) {
        return "/product/" + slug;
    },
    cart: "/cart",
};
export default ROUTE;
