import axios from "axios"
import actionTypes from "../constant/constant"
import listAPI from './../../api/API';

const getUserInfo = (userId) => async (dispatch) => {
    dispatch({
        type: actionTypes.GET_CARTS_BY_USER_ID_REQUEST
    })
    try {
        const response = await axios.get(listAPI.GET_LIST_CARTS_BY_USER_ID, {
            params: {
                id: userId
            },
            headers: { "Authorization": `Bearer ${localStorage.token}` }
        })
        dispatch({
            type: actionTypes.GET_CARTS_BY_USER_ID_SUCCESS,
            payload: response.data.carts
        })
        return response
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CARTS_BY_USER_ID_FAIL
        })
    }
}


const toggleSignIn = () => {
    return {
        type: actionTypes.TOGGLE_SIGN_IN
    }
}

const toggleSignUp = () => {
    return {
        type: actionTypes.TOGGLE_SIGN_UP
    }
}

const getProduct = (url) => async (dispatch) => {
    const res = await axios.get(url)
    dispatch({
        type: actionTypes.GET_PRODUCT,
        payload: res.data
    })
}

const userActions = {
    getUserInfo,
    toggleSignIn,
    toggleSignUp,
    getProduct
}
export default userActions;