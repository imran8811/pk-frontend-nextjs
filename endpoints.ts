// export const baseRoute = 'http://localhost/pk-apis-php';
// export const basePath = 'http://localhost:3000';
export const baseRoute = 'https://api.pkapparel.com';
export const basePath  = 'https://www.pkapparel.com';

export const ADMIN_LOGIN          = `${baseRoute}/admin/login`;
export const PRODUCT_API          = `${baseRoute}/product`;
export const ADD_PRODUCT          = `${baseRoute}/product/addProduct`;
export const GET_PRODUCT_DETAILS  = `${baseRoute}/product/getById`;
export const GET_PRODUCTS         = `${baseRoute}/product/getAll`;
export const IMAGE_UPLOAD         = `${baseRoute}/admin/product/image-upload`;
export const CREATE_ADMIN_USER    = `${baseRoute}/admin/create`;
export const ADMIN_LOGOUT         = `${baseRoute}/admin/logout`;
export const GET_PRODUCTS_LISTING = `${baseRoute}/product-listing`;
export const GET_ARTICLE_NO       = `${baseRoute}/product/getLatestArticleNo`;
export const UPDATE_PRODUCT_IMAGE_PATH = `${baseRoute}/product/updateImagePath`;
export const PRODUCT_COUNT_BY_DEPT_CATEGORY = `${baseRoute}/product/productCountByDeptCategory`;

//internal routes
export const ORDER_PLACED      = '/order-placed';

//cart 
export const ADD_TO_CART              = `${baseRoute}/cart/addCartItem`;
export const GET_CART_COUNT           = `${baseRoute}/cart/getCartCount`;
export const GET_CART_DETAILS         = `${baseRoute}/cart/getAll`;
export const GET_CART_ITEM_DETAILS    = `${baseRoute}/cart/get`;
export const CART_API                 = `${baseRoute}/cart`;

//order CRUD
export const GET_ORDERS   = `${baseRoute}/order/getAll`;
export const ORDER_API    = `${baseRoute}/order`;

//authentication
export const USER_LOGIN       = `${baseRoute}/auth/login`;
export const USER_SIGN_UP     = `${baseRoute}/auth/signup`;
export const USER_LOGOUT      = `${baseRoute}/auth/logout`;
export const TOKEN_REFRESH    = `${baseRoute}/auth/refresh-token`;
export const FORGOT_PASSWORD  = `${baseRoute}/auth/forgot-password`;
export const RESET_PASSWORD   = `${baseRoute}/auth/reset-password`;
export const LINK_VALIDITY    = `${baseRoute}/auth/link-validity`;

//user
export const GET_USER_PROFILE         = `${baseRoute}/profile`;
export const USER_ADDRESS             = `${baseRoute}/profile/address`;
export const UPDATE_USER_ADDRESS             = `${baseRoute}/profile/address/update`;
