import axios from 'axios';
import React, { useEffect, useState } from 'react';
import listAPI_Back from '../api/API';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ProductInOrders from '../_sharecomponents/productinorder/ProductInOrders';

function Orders(props) {

    const filterParams = useParams();
    const navigate = useNavigate();

    const [ordersList, setOrdersList] = useState([]);

    const [filter, setFilter] = useState({
        userId: localStorage.userId,
        orderStatus: filterParams.orderStatus != '' ? filterParams.orderStatus : '%20',
        pageNumber: '%20'
    });

    const orderStatus = ['UNCONFIMRED', 'DELIVERY', 'DELIVERED', 'CANCELED', 'RETURNS'];

    const [colorOrderStatus, setColorOrderStatus] = useState({
        all: 'info',
        unconfirmed: 'info',
        delivery: 'info',
        delivered: 'info'
    })

    const [currentStatus, setCurrentStatus] = useState("ALL ORDERS");

    const [allOrders, setAllOrders] = useState([]);

    const _getAllOrders = async (filter) => {
        // console.log(filter);
        if (filter.orderStatus == " ") {
            await axios.get(listAPI_Back.ORDERS + "/paging", {
                params: {
                    userId: filter.userId,
                    pageNumber: filter.pageNumber
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {

                setAllOrders(res.data.content)
                // console.log(res.data.content)

            })
        }
        else {
            await axios.get(listAPI_Back.ORDERS + "/paging", {
                params: {
                    userId: filter.userId,
                    orderStatus: filter.orderStatus,
                    pageNumber: filter.pageNumber
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {

                setAllOrders(res.data.content)
                // console.log(res.data.content)

            })
        }

    }

    const _getAllByOrderStatus = async (filter) => {
        // console.log(filter);
        await axios.get(listAPI_Back.ORDERS + "/paging", {
            params: {
                userId: filter.userId,
                orderStatus: filter.orderStatus,
                pageNumber: filter.pageNumber
            },
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then((res) => {

            setAllOrders(res.data.content)
            // console.log(res.data.content)

        }
        )
    }

    const _searchOrders = () => {
        // console.log(filter);
        navigate(("/api/v1/orders/paging/" + filter.userId + "/" + filter.orderStatus + "/" + filter.pageNumber))
    }

    const _cancelOrder = async (orderId) => {
        await axios.put(listAPI_Back.ORDERS + "/update/" + orderId,
            {},
            {
                params: {
                    orderStatus: "CANCEL"
                }
            })
    }

    useEffect(() => {
        // _getOrdersByUserId(localStorage.userId)
        // setFilter({
        //     ...filterParams
        // })

        _getAllOrders(filterParams)
    }, [filterParams])

    useEffect(() => {
        setFilter({
            userId: localStorage.userId,
            orderStatus: filterParams.orderStatus != '' ? filterParams.orderStatus : '%20',
            pageNumber: '%20'
        })
    }, [])
    useEffect(() => {
        _searchOrders();
        // console.log(filter);
    }, [filter.orderStatus, filter.pageNumber])
    useEffect(() => {
        const _filterChange = () => {
            if (filter.userId === '') {
                setFilter({
                    ...filter,
                    userId: '%20'
                })
            }
            if (filter.orderStatus === '') {
                setFilter({
                    ...filter,
                    orderStatus: '%20'
                })
            }

            if (filter.pageNumber === '') {
                setFilter({
                    ...filter,
                    pageNumber: '%20'
                })
            }
        }
        _filterChange()
        console.log(filter);
    }, [filter])

    return (
        <div class='mt-28'>
            <div
                id='header-orders'
                class='
                    flex flex-row items-center justify-center
                    sm:px-32
                    lg:px-80
                    shadow-md
                    my-5
                    '>
                {
                    currentStatus == 'ALL ORDERS' ?
                        <div class='shadow-lg -mb-5 mx-2 '>
                            <Button
                                color='error'
                                variant='contained'
                                onClick={() => {
                                    setCurrentStatus("ALL ORDERS")
                                    setFilter({
                                        ...filter,
                                        orderStatus: "%20"
                                    })
                                }
                                }
                            >

                                ALL ORDERS
                            </Button>
                        </div>

                        :
                        <div class='shadow-lg mx-2'>
                            <Button
                                color='inherit'
                                onClick={() => {
                                    setCurrentStatus("ALL ORDERS")
                                    setFilter({
                                        ...filter,
                                        orderStatus: "%20"
                                    })
                                }
                                }
                            >
                                ALL ORDERS
                            </Button>
                        </div>

                }

                {
                    orderStatus.map((item) => {
                        if (currentStatus == item) {
                            return <div class='shadow-lg -mb-5 mx-2'>
                                <Button
                                    color='error'
                                    variant='contained'
                                    onClick={() => {
                                        setFilter({
                                            ...filter,
                                            orderStatus: item
                                        })
                                        setCurrentStatus(item)
                                    }

                                    }
                                >
                                    {item}
                                </Button>
                            </div>

                        }
                        else {
                            return <div class='shadow-lg mx-2'>
                                <Button
                                    color='inherit'
                                    onClick={() => {
                                        setFilter({
                                            ...filter,
                                            orderStatus: item
                                        })
                                        setCurrentStatus(item)
                                    }

                                    }
                                >
                                    {item}
                                </Button>
                            </div>

                        }
                    })
                }

            </div>
            <div
                id='body-orders'
            >
                {
                    allOrders.map((item) => {
                        return <ProductInOrders

                            product={item}
                        />
                    })
                }
            </div>

        </div>
    );
}

export default Orders;