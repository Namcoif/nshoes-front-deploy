import React, { useEffect, useState } from 'react';
import ProductInOrders from '../../_sharecomponents/productinorder/ProductInOrders';
import { Button } from '@mui/material';
import listAPI_Back from '../../api/API';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavigatePage from '../../_sharecomponents/navigatepage/NavigatePage';

function OrdersManagement(props) {
    const filterParams = useParams();
    const navigate = useNavigate();

    const [ordersList, setOrdersList] = useState([]);
    const [totalPages, setTotalPages] = useState([]);


    const [filter, setFilter] = useState({
        userId: localStorage.userId,
        orderStatus: filterParams.orderStatus != '' ? filterParams.orderStatus : '%20',
        pageNumber: '%20'
    });

    const orderStatus = ['UNCONFIMRED', 'DELIVERY', 'DELIVERED', 'CANCELED', 'RETURNS'];


    const [currentStatus, setCurrentStatus] = useState("ALL ORDERS");

    const [allOrders, setAllOrders] = useState([]);

    const _getAllOrders = async (filter) => {
        // console.log(filter);
        if (filter.orderStatus == " ") {
            await axios.get(listAPI_Back.ORDERS + "/paging", {
                params: {
                    pageNumber: filter.pageNumber
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {

                setAllOrders(res.data.content)
                setTotalPages(Array.from(Array(res.data.totalPages).keys()))

                // console.log(res.data.content)

            })
        }
        else {
            await axios.get(listAPI_Back.ORDERS + "/paging", {
                params: {
                    orderStatus: filter.orderStatus,
                    pageNumber: filter.pageNumber
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {

                setAllOrders(res.data.content)
                setTotalPages(Array.from(Array(res.data.totalPages).keys()))

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
        navigate(("/api/v1/orders-management/" + filter.orderStatus + "/" + filter.pageNumber))
    }


    useEffect(() => {

        _getAllOrders(filterParams)
    }, [filterParams])

    useEffect(() => {
        setFilter({
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
        <div className='mt-28'>
            <div
                id='header-orders'
                className='
                    flex flex-row items-center justify-center
                    sm:px-32
                    lg:px-80
                    shadow-md
                    my-5
                    '>
                {
                    currentStatus == 'ALL ORDERS' ?
                        <div className='shadow-lg -mb-5 mx-2 '>
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
                        <div className='shadow-lg mx-2'>
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
                            return <div className='shadow-lg -mb-5 mx-2'>
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
                            return <div className='shadow-lg mx-2'>
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
            <div
                id='page-number'
                className=''>
                {/* {navigatePage} */}
                <NavigatePage
                    totalPages={totalPages}
                    _onClick={(item) => {
                        setFilter({
                            ...filter,
                            pageNumber: item + 1
                        })
                    }}
                />
            </div>
        </div>
    );
}

export default OrdersManagement;