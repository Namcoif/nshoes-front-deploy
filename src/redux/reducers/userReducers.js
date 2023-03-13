import actionTypes from "../constant/constant";

const initialState = {
    toggleSignIn: false,
    toggleSignUp: false,
    productInfo: {},
    cartsOfUser: []
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
                ...state
            }
        default:
            return state
    }
}

export default userReducers;