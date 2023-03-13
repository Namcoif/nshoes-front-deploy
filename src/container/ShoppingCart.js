import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ProductInCart from '../_sharecomponents/productincart/ProductInCart';
import userActions from './../redux/actions/userActions';
import HandleFunction from './../handle_function/HandleFunction';

function ShoppingCart(props) {


    const dispatch = useDispatch();

    const [productsInCart, setProductsInCart] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const [selectAllItems, setSelectAllItems] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);

    const [status, setStatus] = useState(false);
    // const _getTotalPrice = (price) => {
    //     setTotalPrice(totalPrice + price)
    // }
    const _setProductSelected = () => {
        setTotalPrice(0);
        let count = 0;
        let price = 0;
        productsInCart.forEach(element => {
            if (element.isSelect == true) {
                price += element.product.promotionPrice * element.quantity;
                count++;
            }
            console.log(element);
        });
        if (count == productsInCart.length) {
            setSelectAllItems(true)
        }
        setTotalPrice(price)
    }

    const _handleChange = (e) => {
        if (e.target.checked) {
            setSelectAllItems(true)
            setStatus(!status)
        }
        else {
            setSelectAllItems(false)
            setStatus(!status)

        }
    }

    useEffect(() => {
        dispatch(userActions.getUserInfo(localStorage.userId)).then((res) => {
            const carts = res.data.carts.map((item) => {
                return {
                    ...item,
                    isSelect: false
                }
            })
            console.log(carts);
            setProductsInCart(carts)
            setTotalProducts(res.data.carts.length)
        })
    }, [])
    useEffect(() => {
        _setProductSelected()

    }, [status])
    return (
        <div
            class='
                mt-28
                flex flex-row'>

            <div
                id='items'
                class='mx-5 flex-1'>
                <div
                    class='
                        mb-2 bg-white
                        px-5'>
                    <h1>Shopping Cart</h1>
                    <input
                        type={'checkbox'}
                        onChange={_handleChange}
                        checked={selectAllItems ? 'checked' : null}
                    />
                </div>
                <div
                    class='
                        bg-white'>
                    {
                        productsInCart.map((item) => {
                            return <ProductInCart
                                product={item}
                                getPrice={(isSelect) => {
                                    item.isSelect = isSelect;
                                    // console.log(item);
                                }}
                                setStatus={() => {
                                    setStatus(!status)
                                }}
                                checked={selectAllItems}
                                setSelectAllItems={() => {
                                    setSelectAllItems(false)
                                }} />
                        })
                    }
                </div>
            </div>
            <div
                id='pay'
                class='
                    w-1/4
                    bg-white
                    mr-5
                    px-4'>
                <div
                    id='main-pay'
                    class='
                        flex flex-col'>
                    <h1>Sumary</h1>
                    <div
                        class='
                            flex flex-row
                            justify-between'>
                        <h2>Total</h2>
                        <h2>{HandleFunction.formatNumberToVND(totalPrice)}</h2>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default ShoppingCart;