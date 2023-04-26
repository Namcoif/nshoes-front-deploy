import React, { useEffect, useRef, useState } from 'react';
import listAPI_Back from './../../api/API';
import axios from 'axios';
import pageActions from '../../redux/actions/pageActions';
import { useDispatch } from 'react-redux';
import CustomInput from './../input/CustomInput';
import { MenuItem, Select } from '@mui/material';
import CustomButton from '../button/CustomButton';
import ButtonTeal from '../button/ButtonTeal';

function FormUpdateCategory(props) {
    const { category } = props;
    const dispatch = useDispatch();
    const refSubmit = useRef();


    const [categoryInUpdate, setcategoryInUpdate] = useState(category);

    const _handleChangeCategoryStatus = (e) => {
        setcategoryInUpdate({
            ...categoryInUpdate,
            status: e.target.value
        })
    }

    const _getInfoCategory = (name, value) => {
        setcategoryInUpdate({
            ...categoryInUpdate,
            [name]: value
        })
    }

    const _updateCategory = async (category) => {
        try {
            await axios.put(listAPI_Back.GET_LIST_CATEGORIES + '/update', category, {
                params: {
                    id: category.id
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
        } catch (error) {

        }
        dispatch(pageActions.closeUpdateCategory());

    }

    useEffect(() => {
        setcategoryInUpdate(category);
    }, [])

    return (
        <div class='px-5 flex flex-col items-center'>
            <div
                id='header-update-product'
                className='text-red-vio py-5'
            >
                <h1>Update category</h1>
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
                        valueStart={categoryInUpdate.categoryName}
                    />
                </div>

                <div className='feild'>
                    <label>Status</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryInUpdate.status}
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
                        _updateCategory(categoryInUpdate)}
                    label="Update"
                    refButton={refSubmit}
                />
                <ButtonTeal
                    _onClick={() => {
                        dispatch(pageActions.closeUpdateCategory())
                    }}
                    label="Cancel"
                />
            </div>
        </div>
    );
}

export default FormUpdateCategory;