import React from 'react';
import HandleFunction from '../../handle_function/HandleFunction';
import ButtonIcon from '../button/ButtonIcon';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

function ProductInCart(props) {
    const { product, getPrice, setStatus, checked, setSelectAllItems, _onDelete } = props

    // console.log(product);
    const [isSelect, setIsSelect] = useState(false)
    // const _selectItem = () => {
    //     setIsSelect(!isSelect)
    // }

    const _handleChange = (e) => {
        if (e.target.checked) {
            setIsSelect(true)
        }
        else {
            setIsSelect(false)
            setSelectAllItems()
        }
    }
    useEffect(() => {
        getPrice(isSelect)
        setStatus()
    }, [isSelect])

    useEffect(() => {
        if (checked == true) {
            setIsSelect(true)
        }
        else {
            setIsSelect(false)
        }
    }, [checked])
    return (
        <div
            class='
                flex flex-row
                items-center
                border-solid 
                border-red-vio
                border-b-2 mx-8'>
            <div
                class='mr-2'>
                <input
                    // onClick={_selectItem}
                    type='checkbox'
                    checked={isSelect ? 'checked' : null}
                    onChange={_handleChange}
                    class='
                        '></input>
            </div>
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
                            onClick={_onDelete}
                        />
                    </div>
                </div>
                <div
                    id='size'
                    class='
                            '>
                    <span>Size: {product.size}</span>

                    <div class='flex'>

                    </div>
                    <div class='text-red-vio underline'>

                    </div>
                </div>

                <div class='flex flex-row items-center justify-between 
                    '>
                    <span
                        id='promotion-price'
                        class='
                                text-xl
                                font-semibold'>
                        {HandleFunction.formatNumberToVND(product.product.promotionPrice)}
                    </span>
                    <div
                        id='quantity'
                        class='
                            flex
                            flex-row items-center content-center
                            py-4
                            '>

                        <ButtonIcon
                            label='-'
                        // onclick={_decrementQuantity}
                        />
                        <span class='mx-2'>{product.quantity}</span>
                        <ButtonIcon
                            label='+'
                        // onclick={_incrementQuantity}
                        />
                    </div>
                </div>

                <div
                    id='shipping'
                >
                    <span>Shipping: {HandleFunction.formatNumberToVND(5)}</span>
                </div>

            </div>
        </div >
    );
}

export default ProductInCart;