const host = "http://127.0.0.1:8000";
const API = {
    productByCategory: host + "/api/products/categories",
    blog: host + "/api/posts",
    getBlog: function (slug: string | string[]| undefined) {
        return host + "/api/post/" + slug;
    },
    product: host + "/api/products",
    getProduct: function (id: string | number| any) {
        return host + "/api/product/" + id;
    },
    getProductsByCategory: function(slug: string | string[]| undefined) {
        return host + `/api/category/${slug}/products/`;

    },
    homepage: host + "/api/homepage",
    // featuredProduct: host + "/api/featuredProduct",
    register: host + '/api/register',
    login: host + '/api/login',
    logout:  host + '/api/logout',
    getCSRF: host + '/api/sanctum/csrf-cookie'
};

export default API;
