import React from 'react';

function Footer(props) {
    return (
        <div
            class='
                xl:flex
                xl:flex-row
                xl:items-center
                xl:justify-between
                sm:flex
                sm flex-col

                px-20
                '>
            <div
                id='footer-about-us'>
                <div
                    id='footer-icon'>
                    <h1>N.S.H.O.E.S</h1>
                </div>
                <div
                    id='foot-note'>
                    <span>Your Shoes</span>
                </div>
            </div>
            <div
                id='footer-contact'>
                <div>
                    <a href='https://www.instagram.com/nam.coif/'>
                        <img class='w-5 rounded-circle' src='https://i.postimg.cc/HWP4jRtZ/Contact-instagram-icon-8704817.png' />
                    </a>
                </div>
                <div>
                    <a href='https://www.facebook.com/Nam.coif.Z/'>
                        <img class='w-5 rounded-circle' src='https://i.postimg.cc/6QTXnw5P/Contact-facebook.png' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;