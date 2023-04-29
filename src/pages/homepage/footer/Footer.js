import React from 'react';
import { MdLocationOn } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function Footer(props) {

    const navigate = useNavigate();

    return (
        <div
            className='

            text-white
                xl:flex
                xl:flex-row
                xl:items-center
                xl:justify-between
                sm:flex
                sm flex-col
                py-20
                px-20
                bg-gradient-to-b
                from-cyan-800
                to-teal-600

                mt-5
                '>
            <div
                id='footer-about-us'

            >
                <div
                    id='footer-icon'
                    className='cursor-pointer'
                    onClick={() => {
                        navigate("/");
                        window.scrollTo(0, 0)
                    }}
                >
                    <h1>N.S.H.O.E.S</h1>
                </div>
                <div
                    id='footter-note'>
                    <span>Your Shoes</span>
                </div>
            </div>
            <div
                id='footer-contact'
                className='justify-around flex flex-col '>
                <div>
                    <h1
                        style={{
                            fontFamily: 'Brush Script MT'
                        }}
                    >Contact</h1>
                </div>
                <div>
                    <div className='flex flex-row items-center mt-2'>
                        <MdLocationOn
                            size={25}
                        />
                        <span> Lập Trí, Minh Trí, Sóc Sơn, Hà Nội</span>
                    </div>
                    <div className='flex flex-row items-center mt-2'>
                        <AiFillPhone
                            size={25}
                        />
                        <span> +84378253564</span>
                    </div>
                </div>
                <div className='flex flex-row items-center mt-2'>
                    <div className='mr-2 drop-shadow-lg'>
                        <a href='https://www.instagram.com/nam.coif/' target="_blank">
                            <img className='w-10 rounded-circle' src='https://i.postimg.cc/HWP4jRtZ/Contact-instagram-icon-8704817.png' />
                        </a>
                    </div>
                    <div>
                        <a href='https://www.facebook.com/Nam.coif.Z/' target="_blank">
                            <img className='w-10 rounded-circle' src='https://i.postimg.cc/6QTXnw5P/Contact-facebook.png' />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Footer;