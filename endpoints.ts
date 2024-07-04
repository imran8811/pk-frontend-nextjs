export const baseRoute = 'http://localhost:3001';
// export const baseRoute = 'https://api.pkapparel.com';

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
export const PRODUCT_DETAILS = '/wholesale-shop/product-details';
export const WHOLESALE_SHOP = '/wholesale-shop';
export const ORDER_CONFIRMED = '/order-confirmed';

//cart CRUD
export const ADD_TO_CART = `${baseRoute}/cart/saveItem`;
export const GET_CART_DETAILS = `${baseRoute}/cart/getAll`;
export const CART_API = `${baseRoute}/cart`;

//order CRUD
export const GET_ORDERS = `${baseRoute}/order/getAll`;
export const NEW_ORDER = `${baseRoute}/order/new`;


//authentication
export const USER_LOGIN = `${baseRoute}/auth/login`;
export const USER_SIGN_UP = `${baseRoute}/auth/signup`;
export const USER_LOGOUT = `${baseRoute}/auth/logout`;


//user
export const GET_USER_ACCOUNT = `${baseRoute}/user-account`;
export const USER_ADDRESS = `${baseRoute}/user-account/user-address`;
export const GET_USER_ADDRESS_BY_ID = `${baseRoute}/user-account/user-address-by-id`;
