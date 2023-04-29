import React from 'react';
import './Container.css';
function Welcome(props) {
    return (
        <div className='flex flex-col py-16 bg-gradient-to-tr from-yellow-200 to-rose-500'>
            <div>

            </div>
            <div className='flex flex-row items-center justify-center'>
                <div className=''>
                    <div className='flex flex-row items-end justify-start -ml-16 pb-2'>
                        <img className='w-64 appear' src='https://ae01.alicdn.com/kf/S6261857dce784ba0a25372b21ce834edX/New-Tactical-Boots-Mens-Nonslip-Safety-Boot-Work-Boots-Outdoor-Hiking-Men-Motorcycle-Shoes-Durable-2022.jpg_220x220xz.jpg_.webp' />

                        <img className='w-48 ml-4 appear' src='https://ae01.alicdn.com/kf/Sa13c9f9bcc844b70ad03f2efcd286d28C/Comfortable-Formal-Men-Shoes-Genuine-Leather-Double-Monk-Strap-Black-Brown-Men-Fashion-Dress-Shoes-Wedding.jpg_220x220xz.jpg_.webp' />

                    </div>

                    <div className='flex flex-row items-start justify-end -mr-14 pt-2'>
                        <img className='w-48 mr-4 appear' src='https://ae01.alicdn.com/kf/S6261857dce784ba0a25372b21ce834edX/New-Tactical-Boots-Mens-Nonslip-Safety-Boot-Work-Boots-Outdoor-Hiking-Men-Motorcycle-Shoes-Durable-2022.jpg_220x220xz.jpg_.webp' />

                        <img className='w-64 appear' src='https://i.postimg.cc/tgc9Vgdr/AvtS.png' />

                    </div>

                </div>
                <div className='w-60'></div>
                <div className='flex flex-col items-start text-white'>
                    <div style={
                        { fontFamily: 'Brush Script MT' }
                    }>
                        <h1 className='text-red-vio'>Welcome to NShoes</h1>
                        <span className='text-xl'>You want to buy shoes, we have.<br />
                            You don't have time, we help you.</span>
                    </div>
                    <div className='mt-5 flex flex-row items-start'>
                        <div>
                            <h1 className='text-red-vio'>
                                More 1640
                            </h1>
                            <span>products in stock</span>
                        </div>
                        <div className='w-10'></div>
                        <div>
                            <h1 className='text-red-vio'>
                                10
                            </h1>
                            <span>of product categories</span>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <span style={
                            { fontFamily: 'Brush Script MT' }
                        } className='text-xl'>We help you make the best choice for your feet!</span>
                    </div>
                </div>

            </div>
            <div>

            </div>
        </div >
    );
}

export default Welcome;