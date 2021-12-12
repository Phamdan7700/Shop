const host = "http://127.0.0.1:8000";
const API = {
    productByCategory: host + "/api/products/categories",
    blog: host + "/api/posts",
    getBlog: function (slug: string | string[] | undefined) {
        return host + "/api/post/" + slug;
    },
    getRelativePost: function(slug: string | string[] | undefined) {
        return host + "/api/post/getRelativePost/" + slug;
    },
    product: host + "/api/products",
    getProduct: function (id: string | number | any) {
        return host + "/api/product/" + id;
    },
    getProductsByCategory: function (slug: string | string[] | undefined) {
        return host + `/api/category/${slug}/products/`;
    },
    homepage: host + "/api/homepage",
    // featuredProduct: host + "/api/featuredProduct",
    register: host + "/api/register",
    login: host + "/api/login",
    logout: host + "/api/logout",
    getCSRF: host + "/api/sanctum/csrf-cookie",

    provinces: host + "/api/provinces",
    getDistricts: function (id: number | string) {
        return host + `/api/province/${id}/districts`;
    },
    getWards: function (id: number | string) {
        return host + `/api/province/${id}/wards`;
    },

    order:host + "/api/order",
    forgotPassword: host + "/api/forgot-password",
    resetPassword: host + "/api/reset-password",
};

export default API;
