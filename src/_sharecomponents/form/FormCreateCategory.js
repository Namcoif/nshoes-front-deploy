import React from 'react';
import CustomInput from './../input/CustomInput';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import listAPI_Back from './../../api/API';
import userActions from '../../redux/actions/userActions';
import { useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import CustomButton from '../button/CustomButton';
import ButtonTeal from '../button/ButtonTeal';

function FormCreateCategory(props) {
    const dispatch = useDispatch();
    const refSubmit = useRef();
    const [categoryInCreate, setCategoryInCreate] = useState({});

    const _handleChangeCategoryStatus = (e) => {
        setCategoryInCreate({
            ...categoryInCreate,
            status: e.target.value
        })
    }

    const _getInfoCategory = (name, value) => {
        setCategoryInCreate({
            ...categoryInCreate,
            [name]: value
        })
    }

    // const _getCategories = async () => {
    //     try {
    //         await axios.get(listAPI_Back.GET_LIST_CATEGORIES, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.token}`
    //             }
    //         })
    //     } catch (error) {

    //     }
    //     dispatch(userActions.closeCreateCategory());
    // }

    const _createCategory = async (category) => {
        try {
            await axios.post(listAPI_Back.GET_LIST_CATEGORIES + '/create', category, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
        } catch (error) {

        }
        dispatch(userActions.closeCreateCategory());
    }

    useEffect(() => {
    }, [])
    return (
        <div class='px-5 flex flex-col items-center'>
            <div
                id='header-update-product'
                className='text-red-vio py-5'
            >
                <h1>Create Category</h1>
            </div>
            <div
                id='body-update-product'
                className='w-full'
            >
                <div className='feild'>
                    <label>Category Name</label>
                    <CustomInput
                        type="text"
                        _getInputValue={_getInfoCategory}
                        placeholder="Type category's name"
                        name="categoryName"
                        valueStart={categoryInCreate.categoryName}
                    />
                </div>

                <div className='feild'>
                    <label>Status</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryInCreate.status}
                        label="Age"
                        onChange={_handleChangeCategoryStatus}
                    >
                        <MenuItem value={'ACTIVE'}>Active</MenuItem>
                        <MenuItem value={'NOT_ACTIVE'}>Not Active</MenuItem>
                    </Select>
                </div>
            </div>
            <div
                id='footer-update-product'
                className='py-5 px-5 flex flex-row items-center justify-between w-full'
            >
                <CustomButton
                    _onClick={() =>
                        _createCategory(categoryInCreate)
                    }
                    label="Create"
                    refButton={refSubmit}
                />
                <ButtonTeal
                    _onClick={() => {
                        dispatch(userActions.closeCreateCategory())
                    }}
                    label="Cancel"
                />
            </div>
        </div>
    );
}

export default FormCreateCategory;