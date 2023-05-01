import axios from 'axios';
import React from 'react';
import listAPI_Back from '../../api/API';
import { Button } from '@mui/material';

function FormDeleteAcc(props) {
    const { account, _onClick } = props


    const _deleteAccount = async (userId) => {

        await axios.delete(listAPI_Back.DELETE_USER + userId, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then(() => {
            window.location.reload()
        })
    }

    return (
        <div>
            <div>
                <h2>Are you sure you want to delete account: {account.username} ?</h2>
            </div>
            <div className='flex flex-row items-center justify-end mt-5'>
                <Button
                    color='error'
                    variant='outlined'
                    onClick={() => {
                        _deleteAccount(account.userId)
                        _onClick()

                    }}
                >
                    Delete
                </Button>
                <div className='w-1/12'></div>
                <Button
                    color='success'
                    variant='contained'
                    onClick={() => {
                        _onClick()
                    }}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default FormDeleteAcc;