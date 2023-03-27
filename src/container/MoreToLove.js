import React, { } from 'react';
import { NavLink } from 'react-router-dom';
import HandleFunction from '../handle_function/HandleFunction';
function MoreToLove(props) {
    const { products } = props;

    const randomNum = () => {
        return Math.random()
    }


    const listProducts = products.filter((item) => {
        return item.productImgUrls[0].url !== "null"
    }).map((item, index) => {

        return (<li
            key={item.id + index + randomNum()}
            class='w-44
                    2xl:w-52
                    flex
                    flex-col
                    m-2
                    hover:shadow-2xl'
        >

            <div
                class='
                
                        bg-white
                        p-2
                        rounded-lg'>


                <NavLink
                    key={item.id + index + randomNum()}
                    to={'/api/v1/products/' + item.id}
                >
                    <img src={item.productImgUrls[0].url !== undefined ? item.productImgUrls[0].url : null} class='rounded-lg' />
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
                                bg-teal-300
                                    text-xl
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
                            <span>{item.soldCount + ' sold'}</span>
                            <span class='truncate'>{item.productName}</span>
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
                        bg-red-900
                        flex flex-row
                        justify-center'>
            {products.length == 0
                ?
                <div class='w-full bg-teal-400 flex flex-row items-center justify-center'>
                    <span class='text-xs'>No matching products found</span>
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