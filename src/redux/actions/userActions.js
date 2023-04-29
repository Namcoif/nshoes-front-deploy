import axios from "axios"
import actionTypes from "../constant/constant"
import listAPI_Back from './../../api/API';

const getUserInfo = (userId) => async (dispatch) => {
    dispatch({
        type: actionTypes.GET_CARTS_BY_USER_ID_REQUEST
    })
    try {
        const response = await axios.get(listAPI_Back.GET_LIST_CARTS_BY_USER_ID, {
            params: {
                id: userId
            }
            ,
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

const openCreateProduct = () => {
    return {
        type: actionTypes.OPEN_CREATE_PRODUCT
    }
}

const closeCreateProduct = () => {
    return {
        type: actionTypes.CLOSE_CREATE_PRODUCT
    }
}

const openDeleteProduct = () => {
    return {
        type: actionTypes.OPEN_DELETE_PRODUCT
    }
}

const closeDeleteProduct = () => {
    return {
        type: actionTypes.CLOSE_DELETE_PRODUCT
    }
}

const openCreateCategroy = () => {
    return {
        type: actionTypes.OPEN_CREATE_CATEGORY

    }
}

const closeCreateCategory = () => {
    return {
        type: actionTypes.CLOSE_CREATE_CATEGORY

    }
}


const openDeleteCategory = () => {
    return {
        type: actionTypes.OPEN_DELETE_CATEGORY
    }
}

const closeDeleteCategory = () => {
    return {
        type: actionTypes.CLOSE_DELETE_CATEGORY
    }
}

const openCreateAcc = () => {
    return {
        type: actionTypes.OPEN_CREATE_ACC

    }
}

const closeCreateAcc = () => {
    return {
        type: actionTypes.CLOSE_CREATE_ACC

    }
}

const openDeleteAcc = () => {
    return {
        type: actionTypes.OPEN_DELETE_ACC
    }
}
const closeDeleteAcc = () => {
    return {
        type: actionTypes.CLOSE_DELETE_ACC
    }
}
const openUpdateAcc = () => {
    return {
        type: actionTypes.OPEN_UPDATE_ACC

    }
}

const closeUpdateAcc = () => {
    return {
        type: actionTypes.CLOSE_UPDATE_ACC

    }
}
const getProductNameSearch = (keySearch) => {
    return {
        type: actionTypes.KEY_SEARCH,
        payload: keySearch
    }
}
const userActions = {
    getUserInfo,
    toggleSignIn,
    toggleSignUp,
    getProduct,
    getProductNameSearch,

    openCreateProduct,
    closeCreateProduct,
    openDeleteProduct,
    closeDeleteProduct,

    openCreateCategroy,
    closeCreateCategory,
    openDeleteCategory,
    closeDeleteCategory,

    openCreateAcc,
    closeCreateAcc,
    openUpdateAcc,
    closeUpdateAcc,
    openDeleteAcc,
    closeDeleteAcc
}
export default userActions;