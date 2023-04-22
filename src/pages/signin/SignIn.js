import React, { useEffect, useState } from 'react';
import CustomInput from '../../_sharecomponents/input/CustomInput';
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import listAPI_Back from './../../api/API';
import { useDispatch } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import { Alert } from '@mui/material';
import ButtonTeal from './../../_sharecomponents/button/ButtonTeal';
import { useRef } from 'react';
import pageActions from './../../redux/actions/pageActions';
import CustomButton from '../../_sharecomponents/button/CustomButton';
function SignIn(props) {
    const dispatch = useDispatch();
    const [signInInfo, setSignInInfo] = useState({
        username: '',
        password: ''
    })

    const refInput = useRef();

    const refSubmit = useRef();


    const [isAlert, setIsAlert] = useState(false)

    const [notification, setNotification] = useState({
        auth: '',
        usernameErr: '',
        passwordErr: '',
        succeeded: ''
    })

    const _siginIn = async () => {
        await axios.post(listAPI_Back.SIGN_IN, signInInfo).then((res) => {
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("userId", res.data.userId);
            setNotification({
                succeeded: 'Logged in successfully!'
            })
            dispatch(pageActions.signIn())
            localStorage.setItem("isLogged", true);
            setIsAlert(true)

            const timer = setTimeout(() => {
                setIsAlert(false)
                dispatch(userActions.toggleSignIn())

            }, 1000);
            return () => clearTimeout(timer)
        }).catch((error) => {
            const res = error.response.data;
            console.log(res);

            if (res.auth !== undefined) {
                setNotification({
                    auth: res.auth
                })
            }
            else {
                setNotification({
                    usernameErr: res.username,
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

    const _getSignInInfo = (name, value) => {
        setSignInInfo({
            ...signInInfo,
            [name]: value
        })
    }
    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            refSubmit.current.focus()
        }
    }
    useEffect(() => {
        refInput.current.focus()
    }, [])

    return (
        <div
            onKeyDown={_handleKeyDown}
            class='
                    
                    bg-white
                    px-10
                    py-20'>
            <div
                id='header-sign'
                class='
                        flex
                        flex-col
                        items-center
                        mb-5
                        font-sans
                        font-medium
                        text-red-vio'>
                <h1>Sign In</h1>

            </div>
            <div
                id='body-sign'
                class='
                        flex
                        flex-col
                        items-center
                        '>
                <div
                    id='username'>
                    <label>Username</label>
                    <CustomInput
                        type="text"
                        Icon={AiOutlineUser}
                        _getInputValue={_getSignInInfo}
                        placeholder="Type your usename"
                        name="username"
                        refInput={refInput}
                    />
                </div>
                <div
                    id='password'
                    class='mb-5'>
                    <label>Password</label>
                    <CustomInput
                        type="password"
                        Icon={AiOutlineLock}
                        Icon2={AiOutlineEye}
                        Icon3={AiOutlineEyeInvisible}
                        _getInputValue={_getSignInInfo}
                        placeholder="Type your password"
                        name="password"

                    />
                </div>

                <CustomButton
                    _onClick={() => _siginIn()}
                    label="Sign In"
                    refButton={refSubmit}
                />

            </div>
            <div
                id='footer-sign'
                class='
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

export default SignIn;