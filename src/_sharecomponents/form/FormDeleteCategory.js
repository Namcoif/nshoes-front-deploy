import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import listAPI_Back from '../../api/API';
import axios from 'axios';
import userActions from './../../redux/actions/userActions';
import CustomButton from './../button/CustomButton';
import ButtonTeal from './../button/ButtonTeal';

function FormDeleteCategory(props) {
    const { category } = props;

    const refSubmit = useRef();
    const dispatch = useDispatch();

    const _deleteCategory = async () => {
        try {
            await axios.delete(listAPI_Back.GET_LIST_CATEGORIES + '/' + category.id + "/delete", {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            dispatch(userActions.closeDeleteCategory())

        } catch (error) {
            alert('The CATEGORY is in the PRODUCT, cannot be deleted!');
            dispatch(userActions.closeDeleteCategory())
        }

    }

    return (
        <div class='px-5 flex flex-col items-center'>
            <div
                id='header-delete-product'
                className='py-5'
            >
                <h3>Delete Product</h3>
            </div>
            <div
                id='body-delete-product'
                className='text-red-vio'
            >
                <h2>Are you sure you want to delete the category: {category.categoryName}?</h2>
            </div>
            <div
                id='footer-delete-product'
                className='py-5 px-5 flex flex-row items-center justify-between w-full'
            >
                <CustomButton
                    _onClick={() => {
                        _deleteCategory()
                    }}
                    label="Delete"
                    refButton={refSubmit}
                />
                <ButtonTeal
                    _onClick={() => {
                        dispatch(userActions.closeDeleteCategory())
                    }}
                    label="Cancel"
                />
            </div>
        </div>
    );
}

export default FormDeleteCategory;