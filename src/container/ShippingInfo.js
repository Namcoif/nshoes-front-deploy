import React, { useEffect, useState } from 'react';
import axios from 'axios';
import listAPI_Back from '../api/API';
import { AiOutlineEllipsis } from 'react-icons/ai'
import DropDown from './../_sharecomponents/dropdown/DropDown';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import CustomInput from '../_sharecomponents/input/CustomInput';
import { CiHome, CiPhone } from 'react-icons/ci'
import ButtonTeal from './../_sharecomponents/button/ButtonTeal';
function ShippingInfo(props) {

    const { _getShippingInfoToOrder } = props

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

    const [newExtraInfo, setNewExtraInfo] = useState({
        id: "",
        address: "",
        phoneNumber: "",
        userId: localStorage.userId,
        // onDefault: ""
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
    const [isAddNewInfo, setIsAddNewInfo] = useState(false);

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

    const _confirmShippingInfo = async () => {
        await axios.put(listAPI_Back.SHIPPING_INFO + "/update", editedInfo, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then((res) => {
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

    const _addNewExtraInfo = async (shippingInfo, isTheFirst) => {
        isTheFirst
            ?
            await axios.post(listAPI_Back.SHIPPING_INFO + "/create", {
                ...shippingInfo,
                onDefault: 1
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                }).then((res) => {
                    setCurrentInfo(shippingInfo)
                    setIsAddNewInfo(false)
                })
            :
            await axios.post(listAPI_Back.SHIPPING_INFO + "/create", {
                ...shippingInfo,
                onDefault: 0
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                }).then((res) => {
                    setCurrentInfo(shippingInfo)
                    setIsAddNewInfo(false)
                })
    }

    const _editShippingInfo = (name, value) => {
        setEditedInfo({
            ...editedInfo,
            [name]: value
        })
    }

    const _typeNewShippingInfo = (name, value) => {
        setNewExtraInfo({
            ...newExtraInfo,
            [name]: value
        })
    }

    useEffect(() => {
        _getShippingInfo()
        _getShippingInfoDefault()
    }, [isEdit, isAddNewInfo, localStorage.userId])
    useEffect(() => {
        setEditedInfo(currentInfo)
        _getShippingInfoToOrder(currentInfo)
    }, [currentInfo])
    return (
        <div>
            <div class='flex flex-row justify-between items-center shadow-lg mt-3'>
                <h2>Shipping Info</h2>
                <div class=''>
                    <DropDown
                        Drop={
                            () => <AiOutlineEllipsis size={"30px"} />
                        }
                        DropContent={() => {
                            return shippingInfoList.length > 0
                                ?
                                <div class='flex flex-col shadow-xl px-2 absolute right-24 w-max bg-slate-100 py-3 -top-2'>
                                    <span
                                        class='cursor-pointer pt-2 hover:shadow-xl'
                                        onClick={() => setIsEdit(true)}>
                                        Edit address
                                    </span>
                                    <span
                                        class='cursor-pointer pt-2 hover:shadow-xl'
                                        onClick={() => setIsChooseOthers(true)}>
                                        Choose another address
                                    </span>
                                    <span
                                        class='cursor-pointer pt-2 hover:shadow-xl'
                                        onClick={() => setIsAddNewInfo(true)}>
                                        Add address</span>
                                </div>
                                :
                                <div class='flex flex-col shadow-xl px-2 absolute right-24 w-max bg-slate-100 py-1 -top-2'>
                                    <span
                                        class='cursor-pointer'
                                        onClick={() => setIsAddNewInfo(true)}>
                                        Add address</span>
                                </div>
                        }
                        }
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
                                        class='flex flex-row items-start pt-3 py-2 border-b-2 border-red-400 cursor-pointer hover:shadow-xl '
                                        onMouseEnter={() => {
                                            setIsOnDefault(item.id)
                                        }}
                                        onMouseLeave={() => {
                                            setIsOnDefault(0)
                                        }}

                                    >
                                        <div
                                            class='w-5/6'
                                            onMouseDown={() => {
                                                setCurrentInfo(item)
                                                setIsChooseOthers(false)
                                            }}
                                        >
                                            <table>
                                                <tr
                                                    class=''
                                                >
                                                    <td>
                                                        <span>Address: </span>
                                                    </td>
                                                    <td class='w-3/4'>
                                                        <span>{item.address}</span>
                                                    </td>


                                                </tr>
                                                <tr
                                                    class=''
                                                >
                                                    <td>
                                                        <span>Phone: </span>
                                                    </td>
                                                    <td>
                                                        <span>{item.phoneNumber}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div>
                                            {
                                                isOnDefault == item.id || setAsDefault == item.id ?
                                                    <div>

                                                        <input
                                                            type='checkbox'
                                                            onFocus={() => {
                                                                setSetAsDefault(item.id)
                                                            }} />
                                                        <span> Set as default</span>
                                                    </div>
                                                    : null
                                            }
                                        </div>
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

            <Dialog
                open={isAddNewInfo}
                // onBlur={() => setIsEdit(false)}
                onClose={() => setIsAddNewInfo(false)}
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
                                        _getInputValue={_typeNewShippingInfo}
                                        placeholder="Type your address"
                                        name="address"
                                        valueStart={newExtraInfo.address}
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
                                        Icon={CiPhone}
                                        _getInputValue={_typeNewShippingInfo}
                                        placeholder="Type your phone number"
                                        name="phoneNumber"
                                        valueStart={newExtraInfo.phoneNumber}
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddNewInfo(false)}>Cancel</Button>
                    <Button onClick={() => {
                        if (shippingInfoList.length == 0) {
                            return _addNewExtraInfo(newExtraInfo, true)
                        }
                        else {
                            return _addNewExtraInfo(newExtraInfo, false)
                        }
                    }}>Add</Button>
                </DialogActions>
            </Dialog>

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
                                        Icon={CiPhone}
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
        </div>
    );
}

export default ShippingInfo;