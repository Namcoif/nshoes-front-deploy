
import listAPI_Back from '../../api/API';
import actionTypes from './../constant/constant';
import axios from 'axios';

const changeTitle = (title) => {
    return {
        type: actionTypes.CHANGE_TITLE,
        payload: title
    }
}

const signIn = () => {
    return {
        type: actionTypes.LOGGED

    }
}

const openUpdateProduct = () => {
    return {
        type: actionTypes.OPEN_UPDATE_PRODUCT

    }
}

const closeUpdateProduct = () => {
    return {
        type: actionTypes.CLOSE_UPDATE_PRODUCT

    }
}

const openUpdateCategory = () => {
    return {
        type: actionTypes.OPEN_UPDATE_CATEGORY

    }
}

const closeUpdateCategory = () => {
    return {
        type: actionTypes.CLOSE_UPDATE_CATEGORY

    }
}

const signOut = () => {
    window.localStorage.clear()
    return {
        type: actionTypes.LOGOUT

    }
}


const getProducts = (pageNumber) => async (dispatch) => {
    dispatch({
        type: actionTypes.GET_MORE_TO_LOVE_REQUEST
    })
    try {
        const response = await axios.get(listAPI_Back.GET_LIST_PRODUCTS, {
            params: {
                pageNumber: pageNumber
            }
        })
        dispatch({
            type: actionTypes.GET_MORE_TO_LOVE_SUCCESS
        })
        console.log(response);
        return response
    } catch (error) {
        dispatch({
            type: actionTypes.GET_MORE_TO_LOVE_FAIL
        })
    }

}

const getRecommendedProducts = (filter) => async (dispatch) => {
    dispatch({
        type: actionTypes.GET_RECOMMENDED_PRODUCTS_REQUEST
    })
    try {
        const response = await axios.get(listAPI_Back.GET_LIST_PRODUCTS, {
            params: {
                categoryId: filter.categoryId,
                pageNumber: filter.pageNumber ? filter.pageNumber : 1
            }
        })
        dispatch({
            type: actionTypes.GET_RECOMMENDED_PRODUCTS_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_RECOMMENDED_PRODUCTS_FAIL
        })
    }
}
const pageActions = {
    changeTitle,
    signIn,
    signOut,
    getProducts,
    getRecommendedProducts,
    openUpdateProduct,
    closeUpdateProduct,
    openUpdateCategory,
    closeUpdateCategory
}

export default pageActions;