import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HandleFunction from '../handle_function/HandleFunction';
import { AiOutlineStar } from 'react-icons/ai';
import { CircularProgress, Dialog, DialogContent, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
function MoreToLove(props) {
    const { products } = props;
    const selector = useSelector(state => state)

    const [isLoading, setIsLoading] = useState(false);
    const [hoverProduct, setHoverProduct] = useState("");

    const randomNum = () => {
        return Math.random()
    }

    const listProducts = products.filter((item) => {
        if (item.productImgUrls.length !== 0) {
            return item.productImgUrls[0].url !== "null"
        }
    }).map((item, index) => {
        let starPoint = 0;
        if (item.productRates.length != 0) {
            item.productRates.forEach(element => {
                starPoint += element.star;
                console.log(element);
            });
            console.log(item.productRates);
            starPoint = starPoint / item.productRates.length;
            starPoint = starPoint.toFixed(1);
        }

        return (<li
            key={item.id + index + randomNum()}
            className='
                    w-48
                    2xl:w-52
                    flex
                    flex-col
                    m-6

                    bg-gradient-to-b
                    from-yellow-400
                    to-yellow-200
                    
                    hover:shadow-lg
                    hover:m-4
                    hover:w-52
                    '
        >

            <div
                className='
                
                        
                        p-2
                        rounded-lg
                        2xl:hover:w-56
                        '>


                <NavLink
                    key={item.id + index + randomNum()}
                    to={'/api/v1/products/' + item.id}

                >
                    <div className='flex flex-col justify-center
                    '>
                        <div
                            onMouseOver={() => {
                                setHoverProduct(item.id)
                            }}
                            onMouseLeave={() => {
                                setHoverProduct("")
                            }}
                        >
                            {
                                hoverProduct == item.id ?
                                    <img src={item.productImgUrls[0].url !== undefined ? item.productImgUrls[0].url : null} className='rounded-lg animate-animationRotate45 ease-tranTimeFunc2 duration-1000 hover:-mt-5 hover:mb-5 drop-shadow-lg' />
                                    :
                                    <img src={item.productImgUrls[0].url !== undefined ? item.productImgUrls[0].url : null} className='rounded-lg -mx-9 shadow-lg' />
                            }
                        </div>
                        <div
                            className='
                                pt-1
                                hover:text-red-vio'>
                            <div
                                id='price'
                                className='
                                    flex
                                    flex-row
                                    justify-between
                                    items-end'>
                                <span
                                    id='promotion-price'
                                    className='
                                    bg-gradient-to-t from-red-vio to-red-600
                                    text-white 
                                    px-2
                                    text-lg
                                    rounded-sm
                                    font-semibold'>
                                    {HandleFunction.formatNumberToVND(item.promotionPrice)}
                                </span>

                                <span
                                    id='original-price'
                                    className='
                                    text-black
                                    text-xs
                                    line-through'>
                                    {HandleFunction.formatNumberToVND(item.originalPrice)}
                                </span>
                            </div>
                            <div
                                id='product-info'
                                className='flex flex-col'>
                                <div className='flex flex-row justify-between text-red-600'>
                                    <span>{item.soldCount + ' sold'}</span>
                                    <div className='flex flex-row items-center'>
                                        <span>
                                            {starPoint != 0 ? starPoint : ''}
                                        </span>
                                        <AiOutlineStar />
                                    </div>

                                </div>
                                <span className='truncate'>{item.productName}</span>
                            </div>
                        </div>
                    </div>
                </NavLink>

            </div >
        </li >
        )
    })

    useEffect(() => {
        setIsLoading(selector.page.isLoading)
    }, [selector.page.isLoading])

    return (

        <div

            className='
            flex flex-col
                items-center
                px-6
                
                '>
            <div className='font-sans font-semibold my-8 text-3xl'>
                <hr></hr>
                <span
                    className='bg-red-500 text-white rounded-sm p-4'
                    style={
                        { fontFamily: 'Brush Script MT' }
                    }
                >
                    More to Love
                </span>
                <hr></hr>
            </div >
            {
                isLoading
                    ?
                    <div className='w-fit'>
                        <CircularProgress color='error' />
                    </div>
                    : (products.length == 0
                        ?
                        <div className='w-full bg-gradient-to-t from-red-vio to-red-600 flex flex-row items-center justify-center'>
                            <span className='text-xs text-white'>No matching products found</span>
                        </div>
                        :
                        <div className='flex flex-col items-center'>
                            <ul
                                className='
                            grid
                            gap-3
                            grid-cols-2
                            xl:grid-cols-4
                        '>

                                {listProducts}
                            </ul>
                        </div>
                    )
            }
        </div>
    );
}

export default MoreToLove;