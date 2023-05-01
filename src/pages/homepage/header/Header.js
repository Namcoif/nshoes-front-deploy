import React, { useEffect, useRef, useState } from 'react';
import { CiShoppingCart, CiUser } from "react-icons/ci"
import CustomSearch from '../../../_sharecomponents/input/CustomSearch';
import { Link, useNavigate, useParams } from 'react-router-dom';
import userActions from '../../../redux/actions/userActions';
import { connect, useDispatch, } from 'react-redux';
import DropDown from '../../../_sharecomponents/dropdown/DropDown';
import ButtonTeal from '../../../_sharecomponents/button/ButtonTeal';
import pageActions from './../../../redux/actions/pageActions';
import axios from 'axios';
import listAPI_Back from '../../../api/API';


function Header(props) {


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const refSubmit = useRef();

    const params = useParams();

    const [search, setSearch] = useState("");
    const [role, setRole] = useState("CUSTOMER");

    const _getSearchValue = (name, value) => {
        setSearch(value)
    }

    const _signOut = () => {
        dispatch(pageActions.signOut())
    }

    const _gotToCarts = () => {
        navigate("api/v1/carts/" + localStorage.userId)
    }

    const _navigateSearch = () => {
        navigate("/api/v1/products/search/%20/" + search + "/%20/%20/%20")
    }

    const _navigateSearchUser = () => {
        navigate("/api/v1/admin/" + search)
    }

    const _checkRole = async () => {
        if (localStorage.role !== undefined) {
            try {
                await axios.get(listAPI_Back.GET_LIST_CARTS_BY_USER_ID, {
                    params: {
                        id: localStorage.userId
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                }).then((user) => {
                    console.log(user.data.userRole.role);
                    setRole(user.data.userRole.role)
                })


            } catch (e) {
                // dispatch(userActions.toggleSignIn())
            }
        }


    }

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            refSubmit.current.focus()
        }
    }

    useEffect(() => {
        _checkRole()
    }, [localStorage.role])

    return (
        <div
            onKeyDown={_handleKeyDown}
            className="
                h-24
                items-center
                flex flex-row fixed
                min-w-full
                shadow-md
                bg-gradient-to-t
                from-cyan-800
                to-teal-600
                        
                md:pl-36 
                md:pr-36

                xl:pl-96
                xl:pr-96">
            <div
                className='
                        w-fit
                        flex
                        flex-col
                        items-end
                        mr-1
                        
                        md:mr-4'>

                <Link to={'/'}>
                    <div
                        onClick={() => {
                            document.title = "NShoes"
                        }}
                        className="
                            homepage-logo
                            w-fit
                            cursor-pointer
                            flex
                            flex-row
                            items-center">
                        <img
                            src='https://i.postimg.cc/tgc9Vgdr/AvtS.png'
                            className='
                                h-16'/>
                        <span
                            className='
                            text-white
                            text-3xl
                                font-black'
                            style={{
                                fontFamily: 'Brush Script MT'
                            }}
                        >
                            NShoes
                        </span>
                    </div>

                </Link>


            </div >
            <div className='flex-1'>
                <div
                    className='homepage-search'
                // className="
                //         flex
                //         flex-row
                //         flex-1
                //         items-center
                //         mr-1
                //         md:mr-4"
                >
                    {
                        role == "ADMIN"
                            ?
                            <CustomSearch
                                placeholder="Type user ID..."
                                _getInputValue={_getSearchValue}
                                refSubmit={refSubmit}
                                _onClick={_navigateSearchUser}
                                name="search"
                            />
                            :
                            (
                                params.categoryId ? null :
                                    <CustomSearch
                                        placeholder="Search..."
                                        _getInputValue={_getSearchValue}
                                        refSubmit={refSubmit}
                                        _onClick={_navigateSearch}
                                        name="search"
                                    />
                            )
                    }

                </div>
            </div>
            <div
                id='customer'
                className='
                        ml-1
                        md:ml-4
                        flex
                        flex-row
                        items-center'
            >
                <CiShoppingCart
                    color='white'
                    className='                
                        h-8
                        w-8
                        mr-1'
                    onClick={_gotToCarts}
                />
                <DropDown
                    Drop={
                        () => <CiUser
                            color='white'
                            className='
                                    h-8
                                    w-8
                                    mr-1'
                        />
                    }
                    DropContent={
                        () => <div className='flex flex-col px-5 py-2 rounded bg-white shadow-black2 text-xs items-center'>
                            <div className='border-b-2'>
                                <span>Welcom Back, {localStorage.username}</span>
                            </div>
                            <div className='flex flex-col mt-2 '>
                                {
                                    localStorage.role == "[ADMIN]" ?
                                        <Link to={"/api/v1/admin"}>
                                            <span style={{ fontWeight: '900', fontSize: '16px' }} className='hover:shadow-lg '>Account Management</span>
                                        </Link>
                                        :
                                        <div>
                                            <Link to={"/api/v1/user-info/management"}>
                                                <span style={{ fontWeight: '900', fontSize: '16px' }} className='hover:shadow-lg '> My Account</span>
                                            </Link>
                                            <div className='h-2'></div>
                                            <Link to={"/api/v1/orders/paging/" + localStorage.userId + "/%20/%20"} >
                                                <span style={{ fontWeight: '900', fontSize: '16px' }} className='hover:shadow-lg '> My Orders</span>
                                            </Link>
                                        </div>

                                }



                            </div>
                            <div className='mt-2'>
                                <ButtonTeal
                                    label='Sign out'
                                    _onClick={() => {
                                        _signOut()
                                        navigate("/")
                                    }}
                                />
                            </div>
                        </div>
                    }
                />
            </div>

        </div >

    );
}


const mapDispathToProps = (dispath, props) => {
    return {
        toggleSignIn: () => {
            dispath(userActions.toggleSignIn())
        },
        toggleSignUp: () => {
            dispath(userActions.toggleSignUp())
        }
    }
}

export default connect(null, mapDispathToProps)(Header);

// export default Header;