import React, { useEffect, useState } from 'react';
import axios from 'axios';
import listAPI_Back from '../api/API';
import { AiOutlineEllipsis } from 'react-icons/ai'
import DropDown from './../_sharecomponents/dropdown/DropDown';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import CustomInput from '../_sharecomponents/input/CustomInput';
import { CiHome } from 'react-icons/ci'
import ButtonTeal from './../_sharecomponents/button/ButtonTeal';
function ShippingInfo(props) {
    const [shippingInfoList, setShippingInfoList] = useState([
        {
            id: 1,
            address: "",
            phoneNumber: "",
            userId: "",
            onDefault: ""
        }
    ]);

    const [currentInfo, setCurrentInfo] = useState({
        id: "",
        address: "",
        phoneNumber: "",
        userId: "",
        onDefault: 1
    })

    const [editedInfo, setEditedInfo] = useState({
        id: "",
        address: "",
        phoneNumber: "",
        userId: "",
        onDefault: ""
    })
    const [isEdit, setIsEdit] = useState(false);
    const [isChooseOthers, setIsChooseOthers] = useState(false);
    const [isOnDefault, setIsOnDefault] = useState(0);
    const [setAsDefault, setSetAsDefault] = useState(0);

    const _getShippingInfo = async () => {
        await axios.get(listAPI_Back.SHIPPING_INFO + "/" + localStorage.userId, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then((res) => {
            console.log(res.data);
            setShippingInfoList(res.data)
        })
    }

    const _getShippingInfoDefault = async () => {
        await axios.get(listAPI_Back.SHIPPING_INFO + "/" + localStorage.userId + "/default", {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then((res) => {
            console.log(res.data);
            setCurrentInfo(res.data)
            // setEditedInfo(res.data)

        })
    }
    const _editShippingInfo = (name, value) => {
        setEditedInfo({
            ...editedInfo,
            [name]: value
        })
    }

    const _confirmShippingInfo = async () => {
        await axios.put(listAPI_Back.SHIPPING_INFO + "/update", editedInfo).then((res) => {
            setCurrentInfo(editedInfo)
            setIsEdit(false)
            console.log(res.data);
        })
    }

    const _changeDefaultShippingInfo = async (shippingInfoList, setAsDefault) => {
        console.log(setAsDefault);
        shippingInfoList.map(async (item) => {

            if (item.id == setAsDefault) {
                await axios.put(listAPI_Back.SHIPPING_INFO + "/update", {
                    ...item,
                    onDefault: 1
                }).then((res) => {
                    setCurrentInfo(item)
                })
            }
            else {
                await axios.put(listAPI_Back.SHIPPING_INFO + "/update", {
                    ...item,
                    onDefault: 0
                })
            }


        })
        setIsChooseOthers(false)
    }

    useEffect(() => {
        _getShippingInfo()
        _getShippingInfoDefault()
    }, [isEdit])
    useEffect(() => {
        setEditedInfo(currentInfo)
    }, [currentInfo])
    return (
        <div>
            <Dialog
                open={isEdit}
                // onBlur={() => setIsEdit(false)}
                onClose={() => setIsEdit(false)}
            >
                <DialogContent>
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <span>Address: </span>
                                </td>
                                <td>
                                    <CustomInput
                                        type="text"
                                        Icon={CiHome}
                                        _getInputValue={_editShippingInfo}
                                        placeholder="Type your address"
                                        name="address"
                                        valueStart={editedInfo.address}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Phone number: </span>
                                </td>
                                <td>
                                    <CustomInput
                                        type="text"
                                        Icon={CiHome}
                                        _getInputValue={_editShippingInfo}
                                        placeholder="Type your phone number"
                                        name="phoneNumber"
                                        valueStart={editedInfo.phoneNumber}
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEdit(false)}>Cancel</Button>
                    <Button onClick={_confirmShippingInfo}>Confirm</Button>
                </DialogActions>
            </Dialog>

            <div class='flex flex-row justify-between items-center shadow-lg mt-3'>
                <h2>Shipping Info</h2>
                <div class='relative'>
                    <DropDown
                        Drop={
                            () => <AiOutlineEllipsis size={"30px"} />
                        }
                        DropContent={() => <div class='flex flex-col shadow-xl px-2 absolute right-24 w-max bg-slate-100 py-1 -top-2'>
                            <span
                                class='cursor-pointer'
                                onClick={() => setIsEdit(true)}>
                                Edit address
                            </span>
                            <span
                                class='cursor-pointer'
                                onClick={() => setIsChooseOthers(true)}>
                                Choose another address
                            </span>
                        </div>}
                    />

                </div>
            </div>

            <div>
                {
                    isChooseOthers
                        ?
                        <div>
                            {
                                shippingInfoList.map((item) => {
                                    return <div
                                        class='mt-3 py-2 border-b-2 border-red-400 cursor-pointer hover:shadow-xl hover:bg-teal-200  '
                                        onMouseEnter={() => {
                                            setIsOnDefault(item.id)
                                            console.log(isOnDefault)
                                        }}
                                        onMouseLeave={() => {
                                            setIsOnDefault(0)
                                            console.log(isOnDefault)
                                        }}

                                    >
                                        <table>
                                            <tr>
                                                <td onMouseDown={() => {
                                                    setCurrentInfo(item)
                                                    setIsChooseOthers(false)
                                                }}>
                                                    <span>Address: </span>
                                                </td>
                                                <td>
                                                    <span>{item.address}</span>
                                                </td>
                                                {
                                                    isOnDefault == item.id || setAsDefault == item.id ?
                                                        <td>
                                                            <input
                                                                type='checkbox'
                                                                onFocus={() => {
                                                                    setSetAsDefault(item.id)
                                                                }} />
                                                            <span>Set as default</span>
                                                        </td>
                                                        : null
                                                }

                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Phone number: </span>
                                                </td>
                                                <td>
                                                    <span>{item.phoneNumber}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                })
                            }
                            <div>
                                <ButtonTeal
                                    label="Save"
                                    _onClick={() => _changeDefaultShippingInfo(shippingInfoList, setAsDefault)}
                                />
                            </div>
                        </div>
                        :

                        <div class='mt-2'>
                            <table>
                                <tr>
                                    <td>
                                        <span>Address: </span>
                                    </td>
                                    <td>
                                        <span>{currentInfo.address}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Phone number: </span>
                                    </td>
                                    <td>
                                        <span>{currentInfo.phoneNumber}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                }
            </div>

        </div>
    );
}

export default ShippingInfo;