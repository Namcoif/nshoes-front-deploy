import React, { useRef } from 'react';
import CustomButton from '../button/CustomButton';
import ButtonTeal from '../button/ButtonTeal';
import axios from 'axios';
import listAPI_Back from '../../api/API';
import userActions from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

function FormDeleteProduct(props) {

    const { product } = props;

    const refSubmit = useRef();
    const dispatch = useDispatch();

    const _deleteProduct = async () => {
        try {
            await axios.delete(listAPI_Back.GET_PRODUCT + '/' + product.id + "/delete", {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            dispatch(userActions.closeDeleteProduct())

        } catch (error) {
            alert('The PRODUCT is in the CART, and the ORDER is placed, it cannot be deleted!');
            dispatch(userActions.closeDeleteProduct())
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
                <h2>Are you sure you want to delete the product?</h2>
            </div>
            <div
                id='footer-delete-product'
                className='py-5 px-5 flex flex-row items-center justify-between w-full'
            >
                <CustomButton
                    _onClick={() => {
                        _deleteProduct()
                    }}
                    label="Delete"
                    refButton={refSubmit}
                />
                <ButtonTeal
                    _onClick={() => {
                        dispatch(userActions.closeDeleteProduct())
                    }}
                    label="Cancel"
                />
            </div>
        </div>
    );
}

export default FormDeleteProduct;