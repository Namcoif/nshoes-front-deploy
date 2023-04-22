import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HandleFunction from '../handle_function/HandleFunction';
import { AiOutlineStar } from 'react-icons/ai';
function MoreToLove(props) {
    const { products } = props;

    const [hoverProduct, setHoverProduct] = useState("");

    const randomNum = () => {
        return Math.random()
    }

    const listProducts = products.filter((item) => {
        return item.productImgUrls[0].url !== "null"
    }).map((item, index) => {
        let starPoint = 0;
        if (item.productRates.length != 0) {
            item.productRates.forEach(element => {
                starPoint += element.star;
                console.log(element);
            });
            console.log(item.productRates);
            starPoint = starPoint / item.productRates.length;
        }

        return (<li
            key={item.id + index + randomNum()}
            class='
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
                class='
                
                        
                        p-2
                        rounded-lg
                        2xl:hover:w-56
                        '>


                <NavLink
                    key={item.id + index + randomNum()}
                    to={'/api/v1/products/' + item.id}

                >
                    <div class='flex flex-col justify-center
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
                                    <img src={item.productImgUrls[0].url !== undefined ? item.productImgUrls[0].url : null} class='rounded-lg animate-animationRotate45 ease-tranTimeFunc2 duration-1000 hover:-mt-5 hover:mb-5 drop-shadow-lg' />
                                    :
                                    <img src={item.productImgUrls[0].url !== undefined ? item.productImgUrls[0].url : null} class='rounded-lg -mx-9 shadow-lg' />
                            }
                        </div>
                        <div
                            class='
                                pt-1
                                hover:text-red-vio'>
                            <div
                                id='price'
                                class='
                                    flex
                                    flex-row
                                    justify-between
                                    items-end'>
                                <span
                                    id='promotion-price'
                                    class='
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
                                    class='
                                    text-black
                                    text-xs
                                    line-through'>
                                    {HandleFunction.formatNumberToVND(item.originalPrice)}
                                </span>
                            </div>
                            <div
                                id='product-info'
                                class='flex flex-col'>
                                <div class='flex flex-row justify-between text-red-600'>
                                    <span>{item.soldCount + ' sold'}</span>
                                    <div class='flex flex-row items-center'>
                                        <span>
                                            {starPoint != 0 ? starPoint : ''}
                                        </span>
                                        <AiOutlineStar />
                                    </div>

                                </div>
                                <span class='truncate'>{item.productName}</span>
                            </div>
                        </div>
                    </div>
                </NavLink>

            </div >
        </li >
        )
    })

    return (
        <div
            class='
                        bg-slate-100
                        flex flex-row
                        justify-center

                        px-6
                        
                        border-t-2 border-red-600
                        '>
            {products.length == 0
                ?
                <div class='w-full bg-gradient-to-t from-red-vio to-red-600 flex flex-row items-center justify-center'>
                    <span class='text-xs text-white'>No matching products found</span>
                </div>
                :
                <ul
                    class='
                        grid
                        gap-3
                        grid-cols-2
                        xl:grid-cols-4
                        '>

                    {listProducts}
                </ul>}
        </div>
    );
}

export default MoreToLove;