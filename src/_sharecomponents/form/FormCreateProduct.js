import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../input/CustomInput';
import axios from 'axios';
import listAPI_Back from '../../api/API';
import { MenuItem, Select } from '@mui/material';
import CustomButton from '../button/CustomButton';
import ButtonTeal from '../button/ButtonTeal';
import { useDispatch } from 'react-redux';
import userActions from '../../redux/actions/userActions';

function FormCreateProduct(props) {
    const [productCreate, setProductCreate] = useState({})
    const refInput = useRef();
    const refSubmit = useRef();
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);

    const _getInfoProduct = (name, value) => {
        setProductCreate({
            ...productCreate,
            [name]: value
        })
    }
    const _getCategories = async () => {
        try {
            await axios.get(listAPI_Back.GET_LIST_CATEGORIES, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {
                console.log(res.data);
                setCategories(res.data)
            })
        } catch (error) {

        }
    }

    const _createProduct = async () => {
        try {
            await axios.post(listAPI_Back.GET_PRODUCT + "/create", productCreate, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {
                dispatch(userActions.closeCreateProduct())

                alert(res.data.resultText)
            })
        } catch (error) {

        }
    }

    const _handleChangeProductStatus = (e) => {
        setProductCreate({
            ...productCreate,
            productStatus: e.target.value
        })
    }
    useEffect(() => {
        _getCategories()
    }, [])
    return (
        <div>
            <div>
                <div

                    className='mb-5 w-full'>
                    <label>Product name</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type your usename"
                        name="productName"
                        refInput={refInput}
                    />
                </div>
                <div

                    className='mb-5 w-full'>
                    <label>Promotion price</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type your usename"
                        name="promotionPrice"
                        refInput={refInput}
                    />
                </div>
                <div

                    className='mb-5 w-full'>
                    <label>Original price</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type your usename"
                        name="originalPrice"
                        refInput={refInput}
                    />
                </div>
                <div

                    className='mb-5 w-full'>
                    <label>Quantity</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type your usename"
                        name="quantity"
                        refInput={refInput}
                    />
                </div>
                <div

                    className='mb-5 w-full'>
                    <label>Description</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoProduct}
                        placeholder="Type your usename"
                        name="description"
                        refInput={refInput}
                    />
                </div>
                <div

                    className='mb-5 w-full feild'>
                    <label>Status</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productCreate.productStatus}
                        label="Age"
                        onChange={_handleChangeProductStatus}
                    >
                        <MenuItem value={'ON_SELLING'}>On Selling</MenuItem>
                        <MenuItem value={'STOP_SELLING'}>Stop Selling</MenuItem>
                    </Select>
                </div>
                <div

                    className='mb-5 w-full feild'>
                    <label>Category</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productCreate.categoryId}
                        label="Age"
                        onChange={_handleChangeProductStatus}
                    >
                        {
                            categories.map((item) => {
                                return <MenuItem value={item.id}>
                                    {item.categoryName}
                                </MenuItem>
                            })
                        }
                    </Select>
                </div>

            </div>
            <div
                id='footer-update-product'
                className='py-5 px-5 flex flex-row items-center justify-between w-full'
            >
                <CustomButton
                    _onClick={() =>
                        _createProduct(productCreate)
                    }
                    label="Create"
                    refButton={refSubmit}
                />
                <ButtonTeal
                    _onClick={() => {
                        dispatch(userActions.closeCreateProduct())
                    }}
                    label="Cancel"
                />
            </div>
            <div></div>

        </div>
    );
}

export default FormCreateProduct;