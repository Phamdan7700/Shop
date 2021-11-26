const ROUTE = {
    home: "/",
    laptop: "/laptop",
    smartphone: "/dien-thoai",
    accessories: "/phu-kien",
    news: "/news",
    contact: "/contact",

    getProduct: function (slug: string | number) {
        return "/product/" + slug;
    },
    getPost: function (slug: string | number) {
        return "/news/" + slug;
    },
    cart: "/cart",
    signUp: "/sign-up",
    signIn: "/sign-in",
    checkOut: "/check-out",
};
export default ROUTE;
