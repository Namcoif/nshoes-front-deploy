import React, { useEffect, useState, useRef } from 'react';
import CustomButton from '../../_sharecomponents/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../_sharecomponents/input/CustomInput';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import axios from 'axios';
import listAPI_Back from '../../api/API';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, LinearProgress } from '@mui/material';
import userActions from '../../redux/actions/userActions';
import ButtonTeal from '../../_sharecomponents/button/ButtonTeal';
import actionTypes from '../../redux/constant/constant';
function SignUp(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const refInput = useRef();
    const refSubmit = useRef();


    const [signUpInfo, setSignUpInfo] = useState({
        email: '',
        username: '',
        fullName: '',
        password: ''
    })

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

    const _siginUp = async () => {
        dispatch({
            type: actionTypes.SIGN_UP_REQUEST
        })
        await axios.post(listAPI_Back.SIGN_UP, signUpInfo).then((res) => {

            localStorage.setItem('emailRegister', signUpInfo.email)
            // setNotification({
            //     succeeded: res.data
            // })
            // setIsAlert(true)
            // const timer = setTimeout(() => {
            //     setIsAlert(false)
            //     dispatch(userActions.toggleSignUp())

            // }, 3000);
            dispatch({
                type: actionTypes.SIGN_UP_SUCCESS
            })
            navigate('/ap1/v1/user-confirm')
            // return () => clearTimeout(timer)
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
            const timer = setTimeout(() => {
                setIsAlert(false)

            }, 3000);
            return () => clearTimeout(timer)
        })
    }

    const _getSignUpInfo = (name, value) => {
        setSignUpInfo({
            ...signUpInfo,
            [name]: value

        })
        console.log(signUpInfo);

    }

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            refSubmit.current.focus()
        }
    }
    useEffect(() => {
        refInput.current.focus()
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
                <h1>Sign Up</h1>

            </div>
            <div
                id='body-sign'
                className='
                        flex
                        flex-col
                        items-center
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

                <ButtonTeal
                    _onClick={() => _siginUp()}
                    label="Sign Up"
                    refButton={refSubmit}
                />

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
        </div>
    );
}

export default SignUp;