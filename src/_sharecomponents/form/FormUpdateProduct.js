import React, { useRef } from 'react';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import CustomInput from './../input/CustomInput';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import listAPI_Back from '../../api/API';
import { Button, MenuItem, Select } from '@mui/material';
import CustomButton from '../button/CustomButton';
import ButtonTeal from '../button/ButtonTeal';
import './FormCss.css'
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from './../../redux/constant/constant';
import pageActions from '../../redux/actions/pageActions';
function FormUpdateProduct(props) {
    const { product } = props;

    const dispatch = useDispatch();

    const refSubmit = useRef();

    const [productInUpdate, setProductInUpdate] = useState(product);

    const _handleChangeProductStatus = (e) => {
        setProductInUpdate({
            ...productInUpdate,
            productStatus: e.target.value
        })
    }

    const _getInfoProduct = (name, value) => {
        setProductInUpdate({
            ...productInUpdate,
            [name]: value
        })
    }

    const _updateProduct = async (product) => {
        console.log(product);
        try {
            await axios.put(listAPI_Back.GET_PRODUCT + '/update', product, {
                params: {
                    id: product.id
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
        } catch (error) {

        }
        dispatch(pageActions.closeUpdateProduct());

    }

    useEffect(() => {
        setProductInUpdate(product);
        console.log(productInUpdate);
    }, [])
    return (
        <div className='px-5 flex flex-col items-center'>
            <div
                id='header-update-product'
                className='text-red-vio py-5'
            >
                <h1>Update Product</h1>
            </div>
            <div
                id='body-update-product'
                className='w-full'
            >
                <div className='feild'>
                    <label>Product Name</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type product's name"
                        name="productName"
                        valueStart={productInUpdate.productName}
                    />
                </div>
                <div className='feild'>
                    <label>Promotion Price</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type promotion price"
                        name="promotionPrice"
                        valueStart={productInUpdate.promotionPrice}

                    />
                </div>
                <div className='feild'>
                    <label>Original Price</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type original price"
                        name="originalPrice"
                        valueStart={productInUpdate.originalPrice}

                    />
                </div>
                <div className='feild'>
                    <label>Quantity</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type quantity"
                        name="quantity"
                        valueStart={productInUpdate.quantity}
                    />
                </div>
                <div className='feild'>
                    <label>Description</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type description"
                        name="description"
                        valueStart={productInUpdate.description}
                    />
                </div>
                <div className='feild'>
                    <label>Status</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productInUpdate.productStatus}
                        label="Age"
                        onChange={_handleChangeProductStatus}
                    >
                        <MenuItem value={'ON_SELLING'}>On Selling</MenuItem>
                        <MenuItem value={'STOP_SELLING'}>Stop Selling</MenuItem>
                    </Select>
                </div>
            </div>
            <div
                id='footer-update-product'
                className='py-5 px-5 flex flex-row items-center justify-between w-full'
            >
                <CustomButton
                    _onClick={() =>
                        _updateProduct(productInUpdate)}
                    label="Update"
                    refButton={refSubmit}
                />
                <ButtonTeal
                    _onClick={() => {
                        dispatch(pageActions.closeUpdateProduct())
                    }}
                    label="Cancel"
                />
            </div>
        </div>
    );
}

export default FormUpdateProduct;