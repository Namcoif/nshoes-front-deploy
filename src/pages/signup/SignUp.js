import React, { useEffect, useState, useRef } from 'react';
import CustomButton from '../../_sharecomponents/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../_sharecomponents/input/CustomInput';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import axios from 'axios';
import listAPI_Back from '../../api/API';
import { useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
import userActions from '../../redux/actions/userActions';
function SignUp(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const refInput = useRef();
    const refSubmit = useRef();


    const [signUpInfo, setSignUpInfo] = useState({
        email: '',
        username: '',
        password: ''
    })

    const [isAlert, setIsAlert] = useState(false)

    const [notification, setNotification] = useState({
        auth: '',
        emailErr: '',
        usernameErr: '',
        passwordErr: '',
        succeeded: ''
    })

    const _siginUp = async () => {
        await axios.post(listAPI_Back.SIGN_UP, signUpInfo).then((res) => {

            setNotification({
                succeeded: res.data
            })
            setIsAlert(true)
            const timer = setTimeout(() => {
                setIsAlert(false)
                dispatch(userActions.toggleSignUp())

            }, 3000);
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
                    emailErr: res.email,
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
                <h1>Sign Up</h1>

            </div>
            <div
                id='body-sign'
            >
                <div
                    id='email'
                    class='mb-5'>
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
                    id='username'>
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
                    class='mb-5'>
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



                <CustomButton
                    onclick={() => _siginUp()}
                    label="Sign Up"
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
                {isAlert & notification.emailErr !== undefined ?
                    <Alert severity="error">
                        {notification.emailErr}
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