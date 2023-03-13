
import listAPI from '../../api/API';
import actionTypes from './../constant/constant';
import { type } from '@testing-library/user-event/dist/type';
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

const signOut = () => {
    window.localStorage.clear()
    return {
        type: actionTypes.LOGOUT

    }
}


const getProducts = () => async (dispatch) => {
    dispatch({
        type: actionTypes.GET_MORE_TO_LOVE_REQUEST
    })
    try {
        const response = await axios.get(listAPI.GET_LIST_PRODUCTS)
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
const pageActions = {
    changeTitle,
    signIn,
    signOut,
    getProducts
}

export default pageActions;