import actionTypes from "../constant/constant";

const initailState = {
    title: 'NShoes',
    isLogin: false,
    isLoading: false
}

const pageReducers = (state = initailState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case actionTypes.LOGGED:
            return {
                ...state,
                isLogin: true
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLogin: false
            }
        case actionTypes.GET_MORE_TO_LOVE_FAIL:
            return {
                ...state,
                isLoading: false
            }

        case actionTypes.GET_MORE_TO_LOVE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_MORE_TO_LOVE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.GET_RECOMMENDED_PRODUCTS_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.GET_RECOMMENDED_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_RECOMMENDED_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}

export default pageReducers;