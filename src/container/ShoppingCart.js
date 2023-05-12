import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ProductInCart from '../_sharecomponents/productincart/ProductInCart';
import userActions from './../redux/actions/userActions';
import HandleFunction from './../handle_function/HandleFunction';
import listAPI_Back from './../api/API';
import { Dialog, DialogContent } from '@mui/material';
import ButtonTeal from '../_sharecomponents/button/ButtonTeal';
import CustomButton from './../_sharecomponents/button/CustomButton';
import ShippingInfo from './ShippingInfo';
import { Link } from 'react-router-dom';

function ShoppingCart(props) {


    const dispatch = useDispatch();

    const [productsInCart, setProductsInCart] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const [selectAllItems, setSelectAllItems] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);

    const [status, setStatus] = useState(false);

    const [statusRemove, setStatusRemove] = useState('');

    const [toggleMessage, setToggleMessage] = useState(false);

    const [togglePayment, setTogglePayment] = useState(false);

    const [toggleAddInfo, setToggleAddInfo] = useState(false);

    const [statusOrder, setStatusOrder] = useState('');

    const [toggleMessageOrder, setToggleMessageOrder] = useState(false);


    const [shippingInfo, setShippingInfo] = useState({});

    const [productsWillOrder, setProductsWillOrder] = useState([]);

    // const _getTotalPrice = (price) => {
    //     setTotalPrice(totalPrice + price)
    // }


    const _setProductSelected = () => {
        setTotalPrice(0);
        let count = 0;
        let price = 0;
        let productsWillOrder = []

        productsInCart.forEach(element => {
            if (element.isSelect == true) {
                price += element.product.promotionPrice * element.quantity;
                count++;
                productsWillOrder.push(element)
            }
            // console.log(element);
        });
        setProductsWillOrder(productsWillOrder)

        console.log(productsWillOrder);

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

    // const _getShippingInfo = async (userId) => {
    //     await axios.get(listAPI_Back.SHIPPING_INFO + "/" + userId, {
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.token}`
    //         }
    //     }).then((res) => {
    //         setShippingInfo(res.data[0])
    //     })
    // }

    const _deleteProductInCart = async (cartId, item, productsInCart) => {

        await axios.delete(listAPI_Back.CARTS + "/remove/" + cartId, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then((res) => {
            productsInCart.splice(productsInCart.indexOf(item), 1)
            setStatusRemove(res.data.resultText)
            setToggleMessage(true)
        })
    }

    const _createOrders = async (products, shippingInfo, productsInCart) => {
        console.log(products);
        console.log(shippingInfo);

        setStatusRemove("")

        products.map(async (item) => {
            await axios.post(listAPI_Back.ORDERS + "/create-order",
                {

                    address: shippingInfo.address,
                    orderStatus: "UNCONFIMRED",
                    phoneNumber: shippingInfo.phoneNumber,
                    quantity: item.quantity,
                    size: item.size,
                    productPrice: item.product.promotionPrice,
                    userId: localStorage.userId,
                    product: {
                        id: item.product.productId
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                }).then((res) => {
                    setStatusOrder(res.data.textResult)
                    setToggleMessageOrder(true)
                })

            await axios.delete(listAPI_Back.CARTS + "/remove/" + item.id, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {
                productsInCart.splice(productsInCart.indexOf(item), 1)
                setStatusRemove(res.data.resultText)
                setStatus(!status)
            })
        })

    }

    const _getShippingInfoToOrder = (info) => {
        setShippingInfo(info)
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
        // _getShippingInfo(localStorage.userId)
    }, [])
    useEffect(() => {
        _setProductSelected()

    }, [status])
    return (
        <div
            className='
                mt-28
                flex flex-row'>
            <Dialog
                open={toggleMessage}
                onBlur={() => setToggleMessage(false)}
                onClose={() => setToggleMessage(false)}
            >
                <DialogContent>
                    {statusRemove}
                </DialogContent>

            </Dialog>

            <Dialog
                open={toggleMessageOrder}
                onBlur={() => setToggleMessageOrder(false)}
                onClose={() => setToggleMessageOrder(false)}
            >
                <DialogContent>
                    {statusOrder}
                </DialogContent>

            </Dialog>

            <Dialog
                open={togglePayment}
                onBlur={() => setTogglePayment(false)}
                onClose={() => setTogglePayment(false)}
            >
                <DialogContent>
                    <div>
                        <span>Confirm payment for products</span>
                        <div className='flex flex-row justify-around'>
                            < CustomButton
                                label="Payment"
                                _onClick={() => {
                                    _createOrders(productsWillOrder, shippingInfo, productsInCart)
                                    setTogglePayment(false)
                                }}
                            />
                            <div className='w-2/5'>

                            </div>
                            <ButtonTeal
                                label="Cancel"
                                _onClick={() => setTogglePayment(false)}
                            />

                        </div>

                    </div>
                </DialogContent>

            </Dialog>

            <div
                id='items'
                className='mx-5  w-3/4'>
                <div
                    className='
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
                    className='
                        bg-white'>
                    {
                        productsInCart.map((item) => {
                            return <ProductInCart
                                product={item}

                                _changeQuantity={(quantity) => {
                                    item.quantity = quantity
                                    setStatus(!status)
                                }}
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
                                }}
                                _onDelete={() => {
                                    _deleteProductInCart(item.id, item, productsInCart)
                                }}
                            />

                        })
                    }
                </div>
            </div>
            <div
                id='pay'
                className='
                    w-1/4
                    bg-white
                    mr-5
                    px-4
                    '>
                <div className='sticky top-28'>


                    <div
                        id='main-pay'
                        className='
                        flex flex-col
                        px-5
                        shadow-lg
                        '>
                        <h1>Sumary</h1>
                        <div className='h-2'></div>
                        <div
                            className='
                            flex flex-row 
                            justify-between'>
                            <h2>Total</h2>
                            <h2>{HandleFunction.formatNumberToVND(totalPrice)}</h2>
                        </div>
                        <div className=' flex flex-col items-center pt-5'>
                            <CustomButton
                                label="Order"
                                _onClick={() => {
                                    if (shippingInfo.id === '') {
                                        setToggleAddInfo(true)

                                    }
                                    else
                                        setTogglePayment(true)
                                }}
                            />
                        </div>
                        <div className='h-3'></div>

                    </div>
                    <ShippingInfo
                        toggleAddInfo={toggleAddInfo}
                        _getShippingInfoToOrder={_getShippingInfoToOrder}
                    />
                </div>
            </div>



        </div>
    );
}

export default ShoppingCart;