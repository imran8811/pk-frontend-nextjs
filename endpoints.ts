const baseRoute = 'http://localhost:3001';
// const baseRoute = 'https://www.pkapparel.com/api';

// export const basePath = 'http://localhost:8000';
export const basePath = 'https://www.pkapparel.com';
export const ADMIN_LOGIN = `${baseRoute}/admin/login`;
export const PRODUCT_API = `${baseRoute}/product`;
export const GET_PRODUCT_DETAILS = `${baseRoute}/product/details`;
export const GET_PRODUCTS = `${baseRoute}/product/getAll`;
export const IMAGE_UPLOAD = `${baseRoute}/admin/product/image-upload`;
export const CREATE_ADMIN_USER = `${baseRoute}/admin/create`;
export const ADMIN_LOGOUT = `${baseRoute}/admin/logout`;
export const GET_PRODUCTS_LISTING = `${baseRoute}/product-listing`;
export const GET_ARTICLE_NO = `${baseRoute}/product/getLatestArticleNo`;
export const UPDATE_PRODUCT_IMAGE_PATH = `${baseRoute}/product/update-image-path`;

//internal routes
export const PRODUCT_DETAILS = '/wholesale-shop/product-details'
export const WHOLESALE_SHOP = '/wholesale-shop'