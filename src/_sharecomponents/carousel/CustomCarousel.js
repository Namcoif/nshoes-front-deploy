import React from 'react';

import './CustomCarousel.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonIcon from '../button/ButtonIcon';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
function CustomCarousel(props) {
    const { itemCarousel } = props
    console.log(itemCarousel);

    const _nextItem = (isNext) => {
        const width = document.querySelector('.item-carousel').offsetWidth;
        console.log(width);
        if (isNext == true) {
            document.getElementById('formList').scrollLeft += width + 16;
        }
        else {
            document.getElementById('formList').scrollLeft -= width - 16;
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <div>
                <h1 className='text-red-500 '
                    style={
                        { fontFamily: 'Brush Script MT' }
                    }

                >Discount</h1>
            </div>
            <div id='formList'
                className='
                border-4 rounded-lg border-red-vio
                py-5
                mt-5
                max-w-full
                overflow-auto
                scroll-smooth
            
                '
            >
                <div className=' flex flex-row w-max                                     rounded-sm
'>
                    {itemCarousel.map((item) => {
                        if (item.productImgUrls[0].url != "null") {
                            return <Link to={'/api/v1/products/' + item.id}>
                                <div className='item-carousel w-max px-2 mx-2 cursor-pointer'>
                                    <img src={item.productImgUrls[0].url} className='rounded-sm'>

                                    </img>
                                    <span
                                        className='
                                        p-2 
                                        bg-gradient-to-t from-red-vio to-red-600
                                        text-white 
                                        rounded-sm
                                    '>
                                        {(100 - item.promotionPrice / item.originalPrice * 100).toFixed(2)}%
                                    </span>
                                </div>
                            </Link>

                        }

                    })}

                </div>
            </div>
            <div className='flex flex-row items-center mt-5 cursor-pointer '>
                <div className='flex flex-row items-center justify-center w-6 h-6  rounded-circle bg-red-500 hover:shadow-lg'
                    onClick={() => {
                        _nextItem(false)
                    }}
                >
                    <GrFormPrevious />
                </div>
                <div className='w-5'></div>
                <div className='flex flex-row items-center justify-center w-6 h-6  rounded-circle bg-red-500 hover:shadow-lg'
                    onClick={() => {
                        _nextItem(true)
                    }}
                >
                    <GrFormNext color='white' />
                </div>
            </div>

        </div>

    );
}

export default CustomCarousel;