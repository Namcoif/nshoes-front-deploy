import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import listAPI_Back from '../../api/API';
import FormCreateAcc from '../../_sharecomponents/form/FormCreateAcc';
import FormuUpdateAcc from '../../_sharecomponents/form/FormuUpdateAcc';
import FormDeleteAcc from '../../_sharecomponents/form/FormDeleteAcc';
import { useDispatch } from 'react-redux';
import actionTypes from '../../redux/constant/constant';

function AccountsManagement(props) {

    const dispatch = useDispatch();

    const [currentInfo, setCurrentInfo] = useState('List Accounts');
    const [listUsers, setListUsers] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isLock, setIsLock] = useState(false);
    const [isUnLock, setIsUnLock] = useState(false);

    const [accUpdate, setAccUpdate] = useState({});

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
        dispatch({
            type: actionTypes.SIGN_UP_REQUEST
        })

        await axios.put(listAPI_Back.LOCK_USER + user.userId, {},
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {


                dispatch({
                    type: actionTypes.SIGN_UP_SUCCESS
                })
                console.log(res);
                window.location.reload()
            }).catch((error) => {

                dispatch({
                    type: actionTypes.SIGN_UP_FAIL
                })
            })
    }

    const _unLockAccount = async (user) => {
        dispatch({
            type: actionTypes.SIGN_UP_REQUEST
        })

        await axios.put(listAPI_Back.UN_LOCK_USER + user.userId, {},
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {


                dispatch({
                    type: actionTypes.SIGN_UP_SUCCESS
                })
                console.log(res);
                window.location.reload()
            }).catch((error) => {

                dispatch({
                    type: actionTypes.SIGN_UP_FAIL
                })
            })
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
                <Dialog
                    open={isLock}
                    onClose={() => { setIsLock(false) }}
                    fullWidth
                >
                    <DialogContent>
                        <div className='flex flex-row items-center justify-center text-red-600'>
                            Are you sure you want to LOCK account &nbsp;  <span className='text-3xl'> {accUpdate.username}</span> &nbsp; ?
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color='error'
                            variant='outlined'
                            onClick={() => {
                                _lockAccount(accUpdate)
                            }}
                        >
                            Lock
                        </Button>
                        <Button
                            color='success'
                            variant='contained'
                            onClick={() => setIsLock(false)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={isUnLock}
                    onClose={() => { setIsUnLock(false) }}
                    fullWidth
                >
                    <DialogContent>
                        <div className='flex flex-row items-center justify-center text-red-600'>
                            Are you sure you want to UNLOCK account &nbsp;  <span className='text-3xl'> {accUpdate.username}</span> &nbsp; ?
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color='error'
                            variant='outlined'
                            onClick={() => {
                                _unLockAccount(accUpdate)
                            }}
                        >
                            UnLock
                        </Button>
                        <Button
                            color='success'
                            variant='contained'
                            onClick={() => setIsUnLock(false)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={isCreate}
                    onClose={() => { setIsCreate(false) }}
                    fullWidth
                >
                    <DialogContent>
                        <FormCreateAcc
                            _onClick={() => {
                                setIsCreate(false)
                            }}
                        />
                    </DialogContent>

                </Dialog>
                <Dialog
                    open={isUpdate}
                    onClose={() => { setIsUpdate(false) }}
                    fullWidth
                >
                    <DialogContent>
                        <FormuUpdateAcc
                            account={accUpdate}
                            _onClick={() => {
                                setIsUpdate(false)
                            }}
                        />
                    </DialogContent>

                </Dialog>
                <Dialog
                    open={isDelete}
                    onClose={() => { setIsDelete(false) }}
                    fullWidth
                >
                    <DialogContent>
                        <FormDeleteAcc
                            account={accUpdate}

                            _onClick={() => {
                                setIsDelete(false)
                            }}
                        />
                    </DialogContent>

                </Dialog>
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
                                        setIsCreate(true)
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
                                <td>{item.userRole !== null ? item.userRole.role : 'null'}</td>
                                <td>{item.status}</td>
                                <td>
                                    {
                                        item.userRole !== null
                                            ?
                                            (
                                                item.userRole.role !== "CUSTOMER"
                                                    ?
                                                    <Button
                                                        color='success'
                                                        variant='outlined'
                                                        onClick={() => {
                                                            setAccUpdate(item)
                                                            setIsUpdate(true)
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                    :
                                                    (
                                                        item.status !== "NOT_ACTIVE"
                                                            ?
                                                            <Button
                                                                color='error'
                                                                variant='outlined'
                                                                onClick={() => {
                                                                    setAccUpdate(item)
                                                                    setIsLock(true)
                                                                }}
                                                            >
                                                                Lock
                                                            </Button>
                                                            :
                                                            <Button
                                                                color='success'
                                                                variant='contained'
                                                                onClick={() => {
                                                                    setAccUpdate(item)
                                                                    setIsUnLock(true)
                                                                }}
                                                            >
                                                                Unlock
                                                            </Button>

                                                    )
                                            )
                                            :
                                            null

                                    }

                                </td>
                                <td>
                                    {
                                        item.userRole !== null
                                            ?
                                            (
                                                item.userRole.role !== "ADMIN"
                                                    ?
                                                    <Button
                                                        color='error'
                                                        variant='contained'
                                                        onClick={() => {
                                                            setAccUpdate(item)
                                                            setIsDelete(true)
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                    :
                                                    null
                                            )
                                            :
                                            <Button
                                                color='error'
                                                variant='contained'
                                                onClick={() => {
                                                    setAccUpdate(item)
                                                    setIsDelete(true)
                                                }}
                                            >
                                                Delete
                                            </Button>
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