import React, { useEffect, useState } from 'react';
import HandleFunction from '../../handle_function/HandleFunction';
import { Button } from '@mui/material';
import DropDown from '../dropdown/DropDown';
import { Link } from 'react-router-dom';

function ProductInStatistical(props) {
    const { product } = props
    const [productInStatistical, setProductInStatistical] = useState({});

    const sizeCm = [22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 2.5];

    console.log(product);
    useEffect(() => {
        setProductInStatistical(product)
    }, [])
    return (
        <Link
            to={'/api/v1/products/' + product.id}
        >
            <div className='
            px-5
            py-5
                cursor-pointer
                justify-center
                items-center
                flex
                flex-row
                mt-5
                shadow-xl'>
                <div
                    id='img-product'
                    className=' 
                       w-1/5'>
                    <div id='main-img' className='w-full'>
                        {
                            product.productImgUrls.length !== 0
                                ?
                                <img src={product.productImgUrls[0].url} className='w-full' />
                                : null
                        }
                    </div>

                </div>

                <div id='info-product'
                    className='
                    flex 
                    flex-col
                    mx-8
                    w-3/5
                    '>

                    <div className='flex flex-row justify-between items-center'>
                        <span
                            id='name-product'
                            className='truncate w-5/6'>
                            {product.productName}
                        </span>

                    </div>
                    <div className='flex flex-row  justify-between'>


                        <div className='flex flex-col'>
                            <div
                                id='size'
                                className='
                           mt-3 '>
                                <div className='text-gray-400'>
                                    <span>Size</span>
                                </div>
                                <div className='flex text-red-vio'>
                                    {
                                        product.productSizes.map((item) => {
                                            return <DropDown
                                                Drop={() => {
                                                    return <div
                                                    >

                                                        <button
                                                            className='
                                                        text-xs
                                                        border-2 border-solid border-gray-500
                                                        rounded
                                                        mr-2
                                                        p-2
                                                        hover:border-red-vio'

                                                        >

                                                            {item.size}

                                                        </button>
                                                    </div>
                                                }


                                                }
                                                DropContent={() =>
                                                    <div className='flex flex-col items-center mt-1 p-5 rounded bg-white shadow-black2 text-xs'>
                                                        <span>Manufacturer Size</span>
                                                        <div className='flex flex-row justify-between mt-4'>
                                                            <span className=''>Heel to Toe</span>
                                                            <span className='bg-teal-500 px-1 rounded ml-5 '>{sizeCm[item.size - 35]}cm</span>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        })
                                    }
                                </div>
                            </div>



                        </div>

                    </div>

                </div>
                <div
                    id='controll-item'
                    className='
                flex flex-col items-end
                flex-1

                '>

                    <div
                        id='price'
                        className='
                            flex
                            flex-col items-end
                            py-4
                            '>
                        <span
                            id='promotion-price'
                            className='
                                font-semibold'>
                            {/* {HandleFunction.formatNumberToVND(product.promotionPrice)} */}
                        </span>
                        <div
                            id='amout'
                            className='flex flex-col items-end pt-2'
                        >
                            <span className='text-md font-normal text-rose-500'>
                                Sold
                            </span>
                            <span
                                className='
                                    text-xl font-extrabold text-white
                                    rounded
                                    bg-rose-600
                                    px-2
                                    '>
                                {product.soldCount}
                            </span>

                        </div>
                        <div
                            id='amout'
                            className='flex flex-col items-end pt-2'
                        >
                            <span className='text-md font-normal text-yellow-500'>
                                Amout
                            </span>
                            <span
                                className='
                                    text-xl font-extrabold text-white
                                    rounded
                                    bg-yellow-400
                                    px-2
                                    '>
                                {HandleFunction.formatNumberToVND(product.promotionPrice)}
                            </span>

                        </div>
                    </div>
                    <div >
                        {

                        }
                    </div>
                </div>

            </div>
        </Link>
    );
}

export default ProductInStatistical;