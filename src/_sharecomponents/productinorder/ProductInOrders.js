import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import HandleFunction from './../../handle_function/HandleFunction';
import ButtonIcon from './../button/ButtonIcon';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import axios from 'axios';
import listAPI_Back from '../../api/API';
import CustomReviews from '../reviews/CustomReviews';

function ProductInOrders(props) {
    const { product } = props
    console.log(product);
    const [isCancel, setIsCancel] = useState(false);
    const [isRate, setIsRate] = useState(false);

    const [reviews, setReviews] = useState({
        "star": 5,
        "comment": "",
        "productId": product.product.id,
        "userId": localStorage.userId
    })

    const _cancelOrder = async () => {
        try {
            await axios.put(listAPI_Back.ORDERS + '/update/' + product.id, {}, {
                params: {
                    orderStatus: 'CANCELED'
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            setIsCancel(false);
        } catch (error) {
            setIsCancel(false);

        }
    }

    const _reviews = async (reviews) => {
        try {
            await axios.post(listAPI_Back.GET_PRODUCT + "/" + product.product.id + "/rate", reviews, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            setIsRate(false);
        } catch (error) {
            setIsRate(false);
        }
    }

    const _getReviews = (name, value) => {
        setReviews({
            ...reviews,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(reviews);
    }, [reviews])
    return (

        <div
            class='
                flex flex-row
                mx-56
                py-5
                items-start
                border-solid 
                border-red-vio
                border-b-2 mx-8'>
            <Dialog
                open={isCancel}
            >
                <DialogContent>
                    Do you want to cancel your order?
                </DialogContent>
                <DialogActions>
                    <Button
                        color='error'
                        variant='outlined'
                        onClick={() => {
                            _cancelOrder();
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={() => {
                            setIsCancel(false);
                        }}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isRate}
            >
                <DialogContent>
                    <CustomReviews
                        _getReviews={_getReviews}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color='success'
                        variant='contained'
                        onClick={() => {
                            _reviews(reviews);
                        }}
                    >
                        Rate
                    </Button>
                    <Button
                        color='success'
                        variant='outlined'
                        onClick={() => {
                            setIsRate(false);
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <div
                id='img-product'
                class=' 
                       w-1/5'>
                <div id='main-img' class='w-full'>
                    <img src={product.product.productImgUrls[0].url} class='w-full' />
                </div>

            </div>

            <div id='info-product'
                class='
                    flex 
                    flex-col
                    mx-8
                    w-3/5
                    '>

                <div class='flex flex-row justify-between items-center'>
                    <span
                        id='name-product'
                        class='truncate w-5/6'>
                        {product.product.productName}
                    </span>

                </div>
                <div class='flex flex-row  justify-between'>


                    <div class='flex flex-col'>
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


                    </div>

                </div>

            </div>
            <div
                id='controll-item'
                class='
                flex flex-col items-end
                flex-1

                '>

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
                                font-semibold'>
                        {HandleFunction.formatNumberToVND(product.productPrice)}
                    </span>
                    <span class='text-xs'>Shipping: {HandleFunction.formatNumberToVND(30000)}</span>
                    <div
                        id='amout'
                        class='flex flex-col items-end pt-2'
                    >
                        <span class='text-md font-normal text-yellow-500'>
                            Amout:
                        </span>
                        <span
                            class='
                                    text-xl font-extrabold text-white
                                    rounded
                                    bg-yellow-400
                                    px-2
                                    '>
                            {HandleFunction.formatNumberToVND(product.productPrice + 30000)}
                        </span>
                        {
                            product.orderStatus != "CANCEL" && product.orderStatus != "RETURNS" ?
                                <Button></Button>
                                : null
                        }
                    </div>
                </div>
                <div >
                    {
                        product.orderStatus != 'DELIVERED' && product.orderStatus != 'CANCELED' && product.orderStatus != 'RETURNS' ?
                            <Button
                                color='error'
                                variant='contained'
                                onClick={() => {
                                    setIsCancel(true);
                                }}
                            >
                                CANCEL
                            </Button>
                            :
                            (product.orderStatus == 'DELIVERED'
                                ?
                                <Button
                                    color='success'
                                    variant='contained'
                                    onClick={() => {
                                        setIsRate(true);
                                    }}
                                >
                                    Rate
                                </Button>
                                : null
                            )
                    }
                </div>
            </div>
        </div >
    );
}

export default ProductInOrders;