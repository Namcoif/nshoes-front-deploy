import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import actionTypes from '../../redux/constant/constant';
import axios from 'axios';
import listAPI_Back from '../../api/API';
import CustomInput from '../input/CustomInput';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Alert, LinearProgress, MenuItem, Select } from '@mui/material';
import ButtonTeal from '../button/ButtonTeal';
import CustomButton from '../button/CustomButton';

function FormuUpdateAcc(props) {
    const { account, _onClick } = props
    console.log(account);
    const [accountUpdate, setAccountUpdate] = useState({});


    const navigate = useNavigate();

    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const refInput = useRef();
    const refSubmit = useRef();


    const [isLoading, setIsLoading] = useState(false)

    const [isAlert, setIsAlert] = useState(false)

    const [notification, setNotification] = useState({
        auth: '',
        emailErr: '',
        usernameErr: '',
        fullNameErr: '',
        passwordErr: '',
        succeeded: ''
    })

    const _UpdateAccount = async () => {
        dispatch({
            type: actionTypes.SIGN_UP_REQUEST
        })
        await axios.put(listAPI_Back.UPDATE_USER + accountUpdate.userId, accountUpdate,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {

                localStorage.setItem('emailRegister', accountUpdate.email)

                dispatch({
                    type: actionTypes.SIGN_UP_SUCCESS
                })
                window.location.reload()
            }).catch((error) => {
                const res = error.response.data;
                console.log(res);
                dispatch({
                    type: actionTypes.SIGN_UP_FAIL
                })

                if (res.auth !== undefined) {
                    setNotification({
                        auth: res.auth
                    })
                }
                else {
                    setNotification({
                        emailErr: res.email,
                        usernameErr: res.username,
                        fullNameErr: res.fullName,
                        passwordErr: res.password,
                    })
                }
                setIsAlert(true)

            })
        console.log(accountUpdate);
    }

    const _getSignUpInfo = (name, value) => {
        setAccountUpdate({
            ...accountUpdate,
            [name]: value

        })
        console.log(accountUpdate);

    }

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            refSubmit.current.focus()
        }
    }
    useEffect(() => {
        refInput.current.focus()
        setAccountUpdate(account)

    }, [])

    useEffect(() => {
        setIsLoading(selector.page.isLoading)
    }, [selector.page.isLoading])


    return (
        <div
            onKeyDown={_handleKeyDown}
            className='
                    bg-white
                    px-10
                    py-20'>

            <div
                id='header-sign'
                className='
                        flex
                        flex-col
                        items-center
                        mb-5
                        font-sans
                        font-medium
                        text-red-vio'>
                <h1>Update Account</h1>
            </div>
            <div
                id='body-sign'
                className='
                        flex
                        flex-col
                        items-start
                        w-full
                        '>

                <div
                    id='email'
                    className='mb-5 w-full'>
                    <label>Email</label>
                    <CustomInput
                        type="email"
                        Icon={AiOutlineMail}
                        _getInputValue={_getSignUpInfo}
                        placeholder="example@gmail.com"
                        name="email"
                        refInput={refInput}
                        disabled={true}
                        valueStart={account.email}
                    />
                </div>
                <div
                    id='full-name'
                    className='mb-5 w-full'>
                    <label>Full Name</label>
                    <CustomInput
                        type="text"
                        Icon={AiOutlineMail}
                        _getInputValue={_getSignUpInfo}
                        placeholder="John, Tom,..."
                        name="fullName"
                        valueStart={account.fullName}

                    />
                </div>
                <div
                    id='username'
                    className='mb-5 w-full'>

                    <label>Username</label>
                    <CustomInput
                        type="text"
                        Icon={AiOutlineUser}
                        _getInputValue={_getSignUpInfo}
                        placeholder="Type your usename"
                        name="username"
                        disabled={true}
                        valueStart={account.username}

                    />
                </div>
                <div
                    id='password'
                    className='mb-5 w-full'>
                    <label>Password</label>
                    <CustomInput
                        type="password"
                        Icon={AiOutlineLock}
                        Icon2={AiOutlineEye}
                        Icon3={AiOutlineEyeInvisible}
                        _getInputValue={_getSignUpInfo}
                        placeholder="Type your password"
                        name="password"

                    />
                </div>
                {/* <div>
                    <label>Status</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={account.userRole.id}
                    >
                        <MenuItem value={account.userRole.id} selected>{account.userRole.role}</MenuItem>
                    </Select>

                </div> */}
                <div className='flex flex-row items-center justify-between w-full mt-5'>
                    <CustomButton
                        _onClick={() => _UpdateAccount()}
                        label="Update"
                        refButton={refSubmit}
                    />
                    <ButtonTeal
                        label="Cancel"
                        _onClick={_onClick}
                    />
                </div>


            </div>
            {
                isLoading ?
                    <div>
                        <h4>Please wait...</h4>
                        <LinearProgress />
                    </div>
                    : null
            }
            <div
                id='footer-sign'
                className='
                        mt-5'>
                {isAlert & notification.succeeded !== undefined ?
                    <Alert severity="success">
                        {notification.succeeded}
                    </Alert>
                    : null}
                {isAlert & notification.auth !== undefined ?
                    <Alert severity="error">
                        {notification.auth}
                    </Alert>
                    : null}
                {isAlert & notification.emailErr !== undefined ?
                    <Alert severity="error">
                        {notification.emailErr}
                    </Alert>
                    : null}
                {isAlert & notification.fullNameErr !== undefined ?
                    <Alert severity="error">
                        {notification.fullNameErr}
                    </Alert>
                    : null}
                {isAlert & notification.usernameErr !== undefined ?
                    <Alert severity="error">
                        {notification.usernameErr}
                    </Alert>
                    : null}
                {isAlert & notification.passwordErr !== undefined ?
                    <Alert severity="error">
                        {notification.passwordErr}
                    </Alert>
                    : null}
            </div>
        </div >
    );
}

export default FormuUpdateAcc;