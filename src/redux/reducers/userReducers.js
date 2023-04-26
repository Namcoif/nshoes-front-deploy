import actionTypes from "../constant/constant";

const initialState = {
    toggleSignIn: false,
    toggleSignUp: false,
    productInfo: {},
    cartsOfUser: [],
    keySearch: '%20',
    isDeleteProduct: false,
    isCreateCategory: false,
    isDeleteCategory: false,
    isCreateAcc: false,
    isUpdateAcc: false,
    isDeleteAcc: false,


}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN_REQUEST:
            return {
                ...state
            }

        case actionTypes.TOGGLE_SIGN_IN:
            return {
                ...state,
                toggleSignIn: !state.toggleSignIn
            }
        case actionTypes.TOGGLE_SIGN_UP:
            return {
                ...state,
                toggleSignUp: !state.toggleSignUp
            }
        case actionTypes.GET_PRODUCT:
            return {
                ...state,
                productInfo: action.payload
            }
        case actionTypes.GET_CARTS_BY_USER_ID_REQUEST:
            return {
                ...state,
            }
        case actionTypes.GET_CARTS_BY_USER_ID_SUCCESS:
            return {
                ...state,
                cartsOfUser: action.payload
            }
        case actionTypes.GET_CARTS_BY_USER_ID_FAIL:
            return {
                ...state,
            }
        case actionTypes.KEY_SEARCH:
            return {
                ...state,
                keySearch: action.payload
            }
        case actionTypes.OPEN_DELETE_PRODUCT:
            return {
                ...state,
                isDeleteProduct: true
            }
        case actionTypes.CLOSE_DELETE_PRODUCT:
            return {
                ...state,
                isDeleteProduct: false
            }

        case actionTypes.OPEN_CREATE_CATEGORY:
            return {
                ...state,
                isCreateCategory: true
            }
        case actionTypes.CLOSE_CREATE_CATEGORY:
            return {
                ...state,
                isCreateCategory: false
            }
        case actionTypes.OPEN_DELETE_CATEGORY:
            return {
                ...state,
                isDeleteCategory: true
            }
        case actionTypes.CLOSE_DELETE_CATEGORY:
            return {
                ...state,
                isDeleteCategory: false
            }

        case actionTypes.OPEN_CREATE_ACC:
            return {
                ...state,
                isCreateAcc: true
            }
        case actionTypes.CLOSE_CREATE_ACC:
            return {
                ...state,
                isCreateAcc: false
            }
        case actionTypes.OPEN_DELETE_ACC:
            return {
                ...state,
                isDeleteAcc: true
            }
        case actionTypes.CLOSE_DELETE_ACC:
            return {
                ...state,
                isDeleteAcc: false
            }
        case actionTypes.OPEN_UPDATE_ACC:
            return {
                ...state,
                isUpdateAcc: true
            }
        case actionTypes.CLOSE_UPDATE_ACC:
            return {
                ...state,
                isUpdateAcc: false
            }
        default:
            return state
    }
}

export default userReducers;