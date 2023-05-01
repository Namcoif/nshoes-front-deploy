import React, { useEffect, useState } from 'react';
import FormuUpdateAcc from '../../_sharecomponents/form/FormuUpdateAcc';
import axios from 'axios';
import listAPI_Back from './../../api/API';
import { useDispatch } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import pageActions from '../../redux/actions/pageActions';
import actionTypes from '../../redux/constant/constant';
import { Dialog, DialogContent } from '@mui/material';
import CustomButton from '../../_sharecomponents/button/CustomButton';

function InfoManagement(props) {

    const dispatch = useDispatch();

    const [user, setUser] = useState({});

    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        dispatch(userActions.getUserInfo(localStorage.userId)).then((res) => {
            setUser(res.data)
        })
        // _getShippingInfo(localStorage.userId)
    }, [])

    return (
        <div className='mt-28 flex flex-col items-center'>
            <Dialog
                open={isUpdate}
                onClose={() => setIsUpdate(false)}
                fullWidth
            >
                <DialogContent>
                    <FormuUpdateAcc
                        account={user}
                        _onClick={() => setIsUpdate(false)}
                    />
                </DialogContent>

            </Dialog>
            <div>
                <h1>Info User</h1>
            </div>
            <div className='my-5
                border-2 rounded-md border-cyan-800
                p-3
            '>
                <div
                    className='
                    flex flex-col 
                        p-3
                    my-3
                    '>
                    <span >Email</span>
                    <span className='text-xl font-semibold'>{user.email}</span>
                </div>
                <div
                    className='
                    flex flex-col 
                                    p-3
                    my-3
                    '
                >
                    <span >Fullname</span>
                    <span className='text-xl font-semibold'>{user.fullName}</span>
                </div>
                <div
                    className='
                    flex flex-col 
                
                    p-3
                    my-3
                    '
                >
                    <span >Username</span>
                    <span className='text-xl font-semibold'>{user.username}</span>
                </div>
            </div>
            <div>
                <CustomButton
                    label="Update"
                    _onClick={() => setIsUpdate(true)}
                />
            </div>

        </div >
    );
}

export default InfoManagement;