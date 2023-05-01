// const HOST = "https://nshoes-back.herokuapp.com"
// const HOST = "http://localhost:8080"
const HOST = ''

const GET_LIST_CATEGORIES = HOST + "/api/v1/categories"
const GET_LIST_PRODUCTS = HOST + "/api/v1/products/paging"
const GET_PRODUCT = HOST + "/api/v1/products"
const GET_SELLING_PRODUCTS = HOST + "/api/v1/products/selling-products"
const ADD_TO_CART = HOST + "/api/v1/carts/add-to-card"
const SIGN_IN = HOST + "/api/v1/auth/sign-in"
const SIGN_UP = HOST + "/api/v1/auth/sign-up"
const SIGN_UP_MANAGER = HOST + "/api/v1/auth/sign-up-manager"
const GET_LIST_CARTS_BY_USER_ID = HOST + "/api/v1/users/user"
const CARTS = "/api/v1/carts"
const ORDERS = "/api/v1/orders"
const SHIPPING_INFO = "/api/v1/shipping"
const GET_SLOWEST_PRODUCTS = "/api/v1/products/slowest-products"
const GET_DISCOUNT_PRODUCTS = "/api/v1/products/discount-products"
const GET_LIST_USERS = "/api/v1/users/admin/paging"
const UPDATE_USER = "/api/v1/users/update/"

const DELETE_USER = "/api/v1/users/admin/delete/"
const LOCK_USER = "/api/v1/users/admin/lock/"
const UN_LOCK_USER = "/api/v1/users/admin/un-lock/"


const listAPI_Back = {
    GET_LIST_CATEGORIES,
    GET_LIST_PRODUCTS,
    GET_DISCOUNT_PRODUCTS,
    GET_SLOWEST_PRODUCTS,
    GET_LIST_USERS,
    UPDATE_USER,
    DELETE_USER,
    LOCK_USER,
    UN_LOCK_USER,

    ADD_TO_CART,
    SIGN_IN,
    SIGN_UP,
    SIGN_UP_MANAGER,

    GET_LIST_CARTS_BY_USER_ID,
    GET_PRODUCT,
    GET_SELLING_PRODUCTS,
    CARTS,
    SHIPPING_INFO,
    ORDERS
}
export default listAPI_Back