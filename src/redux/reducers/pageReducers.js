import actionTypes from "../constant/constant";

const initailState = {
    title: 'NShoes',
    isLoggin: false
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
                isLoggin: true
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggin: false
            }
        case actionTypes.GET_MORE_TO_LOVE_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_MORE_TO_LOVE_REQUEST:
            return {
                ...state
            }
        case actionTypes.GET_MORE_TO_LOVE_SUCCESS:
            return {
                ...state
            }

        default:
            return state
    }
}

export default pageReducers;