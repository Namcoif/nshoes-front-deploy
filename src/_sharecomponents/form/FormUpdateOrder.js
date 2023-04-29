import React, { useEffect, useState } from 'react';
import listAPI_Back from '../../api/API';
import axios from 'axios';
import Orders from './../../container/Orders';
import { Button, MenuItem, Select } from '@mui/material';

function FormUpdateOrder(props) {

    const { product, _onClick } = props
    console.log(product);
    const orderStatusList = [
        'UNCONFIMRED', 'DELIVERY', 'DELIVERED', 'CANCELED', 'RETURNS'
    ]

    const [orderStatus, setOrderStatus] = useState('');

    const _handleChangeProductStatus = (e) => {
        setOrderStatus(e.target.value)
    }
    const _updateOrder = async (orderStatus) => {
        try {
            await axios.put(listAPI_Back.ORDERS + '/update/' + product.id, {}, {
                params: {
                    orderStatus: orderStatus
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((res) => {
                _onClick();
            })
        } catch (error) {
            _onClick();

        }
    }
    useEffect(() => {
        setOrderStatus(product.orderStatus)
    }, [])
    return (
        <div className='px-5 flex flex-col items-center'>
            <div
                className='text-red-vio py-5'
            >
                <h1>Update Orders</h1>
            </div>
            <div>
                <div className='feild'>
                    <label>Status</label>
                    <Select

                        value={orderStatus}
                        label="Age"
                        onChange={_handleChangeProductStatus}
                    >
                        {
                            orderStatusList.map((item) => {
                                return <MenuItem value={item}>{item}</MenuItem>

                            })
                        }
                    </Select>
                </div>
            </div>
            <div className='flex flex-row justify-between mt-5 w-1/2'>
                <Button
                    color='success'
                    variant='contained'
                    onClick={() => {
                        _updateOrder(orderStatus)
                    }}

                >
                    Update
                </Button>
                <div className='w-5'></div>
                <Button
                    color='success'
                    variant='outlined'
                    onClick={_onClick}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default FormUpdateOrder;