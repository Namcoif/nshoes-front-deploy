import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import HandleFunction from './../../handle_function/HandleFunction';
import ButtonIcon from './../button/ButtonIcon';

function ProductInOrders(props) {
    const { product } = props
    console.log(product);
    return (
        <div
            class='
                flex flex-row
                items-center
                border-solid 
                border-red-vio
                border-b-2 mx-8'>

            <div
                id='img-product'
                class=' 
                       '>
                <div id='main-img' class='w-full'>
                    <img src={product.product.productImgUrls[0].url} class='w-full' />
                </div>

            </div>

            <div id='info-product'
                class='
                    flex 
                    flex-col
                    mx-8
                    w-3/4
                    '>

                <div class='flex flex-row justify-between items-center'>
                    <span
                        id='name-product'
                        class='truncate w-5/6'>{product.product.productName}</span>
                    <div
                        id='controll-item'>
                        <AiOutlineDelete
                        // onClick={_onDelete}
                        />
                    </div>
                </div>
                <div
                    id='size'
                    class='
                           mt-3 text-gray-400'>
                    <span>Size: {product.size}</span>

                    <div class='flex'>

                    </div>
                    <div class='text-red-vio underline'>

                    </div>
                </div>

                <div class='flex flex-row items-center justify-between 
                    '>
                    <div>
                        <table>
                            <tr>
                                <td class='w-28'>
                                    <span>Order date: </span>
                                </td>
                                <td>
                                    <span>{new Date(product.createdDate).toLocaleString()}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Received date: </span>

                                </td>
                                {
                                    product.receivedDate != null ?
                                        <td>
                                            <span>{new Date(product.receivedDate).toLocaleString()}</span>
                                        </td> : null
                                }
                            </tr>
                        </table>
                    </div>

                    <div
                        id='price'
                        class='
                            flex
                            flex-col items-end
                            py-4
                            '>
                        <span
                            id='promotion-price'
                            class='
                                text-xl
                                font-semibold'>
                            {HandleFunction.formatNumberToVND(product.productPrice)}
                        </span>
                        <span>Shipping: {HandleFunction.formatNumberToVND(30000)}</span>

                    </div>
                </div>

                <div
                    id='amout'
                    class='flex flex-col'
                >
                    <span>
                        Amout:
                    </span>
                    <span>{HandleFunction.formatNumberToVND(product.productPrice + 30000)}</span>
                </div>
            </div>
        </div >
    );
}

export default ProductInOrders;