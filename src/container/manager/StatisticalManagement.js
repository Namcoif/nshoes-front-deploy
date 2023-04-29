import axios from 'axios';
import React, { useEffect, useState } from 'react';
import listAPI_Back from '../../api/API';
import ProductInStatistical from '../../_sharecomponents/productinstatistical/ProductInStatistical';
import { FiArrowUpCircle } from 'react-icons/fi';
import './StatiscalCSS.css'
import { Button } from '@mui/material';

function StatisticalManagement(props) {

    const [discountProducts, setDiscountProducts] = useState([]);
    const [sellingProducts, setSellingProducts] = useState([]);
    const [slowestSellingProducts, setSlowestSellingProducts] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("Selling");
    const [productStatistics, setProductStatistics] = useState([]);

    const buttonStatiscal = [

        {
            filter: "Selling",
            lable: "SELLING"
        },
        {
            filter: "Slowest",
            lable: "SLOWEST"
        }

    ]

    const _getProductStatistics = async (filter) => {
        if (filter == "Slowest") {
            await axios.get(listAPI_Back.GET_SLOWEST_PRODUCTS, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {
                setProductStatistics(res.data)
                console.log(res.data);
            })
        }

        if (filter == "Selling") {
            await axios.get(listAPI_Back.GET_SELLING_PRODUCTS, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {
                setProductStatistics(res.data)
                console.log(res.data);

            })
        }
    }
    useEffect(() => {
        _getProductStatistics("Selling");
    }, [])
    return (
        <div className='mt-28 
            lg:px-20
            xl:px-52
            2xl:px-96
        '>
            <div
                className='sticky top-3/4 flex flex-col items-end'
            >
                <FiArrowUpCircle
                    className='go-to-top'
                    style={
                        { marginRight: "-60px" }
                    }
                    cursor="pointer"
                    size={50}
                    onClick={() => {
                        window.scrollTo(0, 0)
                    }}
                />
                <div className='hide text-xs -mr-16'>Go to Top</div>
            </div>
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
                    buttonStatiscal.map((item) => {
                        if (currentStatus == item.filter) {
                            return <div className='shadow-lg -mb-5 mx-2'>
                                <Button
                                    color='error'
                                    variant='contained'
                                    onClick={() => {
                                        _getProductStatistics(item.filter)
                                        setCurrentStatus(item.filter)
                                    }

                                    }
                                >
                                    {item.lable}
                                </Button>
                            </div>

                        }
                        else {
                            return <div className='shadow-lg mx-2'>
                                <Button
                                    color='inherit'
                                    onClick={() => {
                                        _getProductStatistics(item.filter)
                                        setCurrentStatus(item.filter)
                                    }

                                    }
                                >
                                    {item.lable}
                                </Button>
                            </div>

                        }
                    })
                }
            </div>
            <div>

                <div>

                </div>
            </div>
            <div>
                {productStatistics.map((item) => {
                    if (item.productImgUrls.length !== 0 && item.productImgUrls[0].url !== "null") {

                        return <ProductInStatistical
                            product={item}
                        />
                    }

                })}
            </div>
            <div>



            </div>

        </div>
    );
}

export default StatisticalManagement;