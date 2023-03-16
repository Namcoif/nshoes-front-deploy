const HOST = "https://nshoes-back.herokuapp.com"

const GET_LIST_CATEGORIES = HOST + "/api/v1/categories"
const GET_LIST_PRODUCTS = HOST + "/api/v1/products/paging"
const GET_PRODUCT = HOST + "/api/v1/products"
const GET_SELLING_PRODUCTS = HOST + "/api/v1/products/selling-products"
const ADD_TO_CART = HOST + "/api/v1/carts/add-to-card"
const SIGN_IN = HOST + "/api/v1/auth/sign-in"
const SIGN_UP = HOST + "/api/v1/auth/sign-up"
const GET_LIST_CARTS_BY_USER_ID = HOST + "/api/v1/users/user"

const listAPI = {
    GET_LIST_CATEGORIES,
    GET_LIST_PRODUCTS,
    ADD_TO_CART,
    SIGN_IN,
    SIGN_UP,
    GET_LIST_CARTS_BY_USER_ID,
    GET_PRODUCT,
    GET_SELLING_PRODUCTS
}
export default listAPI