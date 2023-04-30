import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import listAPI_Back from '../../api/API';

function AccountsManagement(props) {

    const [currentInfo, setCurrentInfo] = useState('List Accounts');
    const [listUsers, setListUsers] = useState([]);
    const moreInfo = [
        "List Accounts", "Create Manager Account"
    ]
    const _getListAccounts = async () => {
        await axios.get(listAPI_Back.GET_LIST_USERS, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then((res) => {
            console.log(res);
            setListUsers(res.data.content);
        })
    }

    const _lockAccount = async (user) => {

    }

    useEffect(() => {
        _getListAccounts()
    }, [])
    return (
        <div className='flex flex-col items-center'>
            <div className=' 
            flex flex-row items-center justify-center
            2xl:px-96 md:px-52 
            sm:px-32
            lg:px-80
            shadow-md
            my-5
            
            '>
                {
                    moreInfo.map((item) => {
                        if (currentInfo == item) {
                            return <div className='shadow-lg -mb-5 mx-2'>
                                <Button
                                    color='error'
                                    variant='contained'
                                    onClick={() => {
                                        setCurrentInfo(item)
                                    }}
                                >
                                    {item}
                                </Button>
                            </div>
                        }
                        else {
                            return <div className='shadow-lg mx-2'>
                                <Button
                                    color='inherit'
                                    onClick={() => {

                                        setCurrentInfo(item)
                                    }}
                                >
                                    {item}
                                </Button>
                            </div>

                        }
                    })
                }
            </div>
            <div>
                <table
                    className='border-collapse'
                >

                    <tr>
                        <th>User ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>

                        <th>Status</th>
                    </tr>
                    {
                        listUsers.map((item) => {
                            return <tr className='h-14'>
                                <td>{item.userId}</td>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <td>{item.username}</td>
                                <td>{item.userRole.role}</td>
                                <td>{item.status}</td>
                                <td>
                                    {
                                        item.userRole.role !== "CUSTOMER"
                                            ?
                                            <Button
                                                color='success'
                                                variant='outlined'

                                            >
                                                Update
                                            </Button>
                                            : <Button
                                                color='error'
                                                variant='outlined'

                                            >
                                                Lock
                                            </Button>
                                    }

                                </td>
                                <td>
                                    {
                                        item.userRole.role !== "ADMIN"
                                            ?
                                            <Button
                                                color='error'
                                                variant='contained'

                                            >
                                                Delete
                                            </Button>
                                            :
                                            null
                                    }

                                </td>
                            </tr>
                        })
                    }
                </table>
            </div>
            <div>

            </div>
        </div>
    );
}

export default AccountsManagement;