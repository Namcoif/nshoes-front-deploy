import React from 'react';
import { Link } from 'react-router-dom';

function SignUpSuccess(props) {

    const email = localStorage.emailRegister
    return (
        <div className='bg-teal-100 h-screen'>

            <div className='pt-20 pl-20 pb-16 flex flex-row items-center cursor-pointer'>
                <Link to="/">
                    <img
                        src='https://i.postimg.cc/tgc9Vgdr/AvtS.png'
                        className='
                                drop-shadow-lg h-32'/>
                    <h1>N.S.H.O.E.S</h1>
                </Link>

            </div>
            <div className='flex flex-col items-center'>
                <h3>Almost done...</h3>
                <h2>Please check your email to <h2 className='text-rose-500 inline'>{email}</h2> to confirm your account</h2>
            </div>
            <div className='flex flex-col items-center mt-20'>
                <h2>Thanks for your wait!</h2>
            </div>
        </div>
    );
}

export default SignUpSuccess;