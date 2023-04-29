import React from 'react';
import HandleFunction from '../../handle_function/HandleFunction';
import ButtonIcon from '../button/ButtonIcon';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

function ProductInCart(props) {
    const { product, getPrice, setStatus, checked, setSelectAllItems, _onDelete, _changeQuantity } = props

    console.log(product);
    const [isSelect, setIsSelect] = useState(false)
    // const _selectItem = () => {
    //     setIsSelect(!isSelect)
    // }

    const [quantity, setQuantity] = useState(product.quantity);

    const _handleChange = (e) => {
        if (e.target.checked) {
            setIsSelect(true)
        }
        else {
            setIsSelect(false)
            setSelectAllItems()
        }
    }

    const _decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const _incrementQuantity = () => {
        setQuantity(quantity + 1)
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

    useEffect(() => {
        _changeQuantity(quantity)
    }, [quantity])
    return (
        <div
            className='
                flex flex-row
                items-center
                border-solid 
                border-red-vio
                border-b-2 mx-8'>
            <div
                className='mr-2'>
                <input
                    // onClick={_selectItem}
                    type='checkbox'
                    checked={isSelect ? 'checked' : null}
                    onChange={_handleChange}
                    className='
                        '></input>
            </div>
            <div
                id='img-product'
                className=' 
                       '>
                <div id='main-img' className='w-full'>
                    <img src={product.product.productImgUrls[0].url} className='w-full' />
                </div>

            </div>

            <div id='info-product'
                className='
                    flex 
                    flex-col
                    mx-8
                    w-3/4
                    '>

                <div className='flex flex-row justify-between items-center'>
                    <span
                        id='name-product'
                        className='truncate w-5/6'>{product.product.productName}</span>
                    <div
                        id='controll-item'>
                        <AiOutlineDelete
                            onClick={_onDelete}
                        />
                    </div>
                </div>
                <div
                    id='size'
                    className='
                            '>
                    <span>Size: {product.size}</span>

                    <div className='flex'>

                    </div>
                    <div className='text-red-vio underline'>

                    </div>
                </div>

                <div className='flex flex-row items-center justify-between 
                    '>
                    <span
                        id='promotion-price'
                        className='
                                text-xl
                                font-semibold'>
                        {HandleFunction.formatNumberToVND(product.product.promotionPrice)}
                    </span>
                    <div
                        id='quantity'
                        className='
                            flex
                            flex-row items-center content-center
                            py-4
                            '>

                        <ButtonIcon
                            label='-'
                            _onClick={_decrementQuantity}
                        />
                        {/* <span className='mx-2'>{product.quantity}</span> */}
                        <span className='mx-2'>{quantity}</span>

                        <ButtonIcon
                            label='+'
                            _onClick={_incrementQuantity}
                        />
                    </div>
                </div>

                <div
                    id='shipping'
                >
                    <span>Shipping: {HandleFunction.formatNumberToVND(30000)}</span>
                </div>

            </div>
        </div >
    );
}

export default ProductInCart;