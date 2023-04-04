import React, { useRef, useState } from 'react';
import { CiShoppingCart, CiUser } from "react-icons/ci"
import CustomSearch from '../../../_sharecomponents/input/CustomSearch';
import { Link, useNavigate, useParams } from 'react-router-dom';
import userActions from '../../../redux/actions/userActions';
import { connect, useDispatch, } from 'react-redux';
import DropDown from '../../../_sharecomponents/dropdown/DropDown';
import ButtonTeal from '../../../_sharecomponents/button/ButtonTeal';
import pageActions from './../../../redux/actions/pageActions';


function Header(props) {


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const refSubmit = useRef();

    const params = useParams();

    const [search, setSearch] = useState("");

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

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            refSubmit.current.focus()
        }
    }

    return (
        <div
            onKeyDown={_handleKeyDown}
            class="
                        h-24
                        items-center
                        flex flex-row fixed
                        min-w-full
                        shadow-md
                        bg-white
                        
                        md:pl-36 
                        md:pr-36

                        xl:pl-96
                        xl:pr-96">
            <div
                class='
                        w-fit
                        flex
                        flex-col
                        items-end
                        mr-1
                        ml-1
                        
                        md: mr-4'>

                <Link to={'/'}>
                    <div
                        onClick={() => {
                            document.title = "NShoes"
                        }}
                        className='homepage-logo'
                        class="
                                w-fit
                                cursor-pointer
                                flex
                                flex-row
                                items-center">
                        <img
                            src='https://i.postimg.cc/tgc9Vgdr/AvtS.png'
                            class='
                                h-10'/>
                        <span
                            class='
                                text-red-vio
                                text-xl
                                font-black'
                        >
                            NShoes
                        </span>
                    </div>

                </Link>


            </div >
            <div class='flex-1'>
                <div
                    className='homepage-search'
                // class="
                //         flex
                //         flex-row
                //         flex-1
                //         items-center
                //         mr-1
                //         md:mr-4"
                >
                    {
                        params.categoryId ? null :
                            <CustomSearch
                                placeholder="Search..."
                                _getInputValue={_getSearchValue}
                                refSubmit={refSubmit}
                                _onClick={_navigateSearch}
                                name="search"
                            />
                    }

                </div>
            </div>
            <div
                id='customer'
                class='
                        mr-1
                        flex
                        flex-row
                        items-center'
            >
                <CiShoppingCart
                    class='
                                h-8
                                w-8
                                mr-1'
                    onClick={_gotToCarts}
                />
                <DropDown
                    Drop={
                        () => <CiUser
                            class='
                                    h-8
                                    w-8
                                    mr-1'
                        />
                    }
                    DropContent={
                        () => <div class='flex flex-col px-5 py-2 rounded bg-white shadow-black2 text-xs'>
                            <div class='border-b-2'>
                                <span>Welcom Back, {localStorage.username}</span>
                            </div>
                            <div class='flex flex-col mt-2 '>
                                <Link>
                                    <span style={{ fontWeight: '900' }} > My Account</span>
                                </Link>
                                <Link>
                                    <span style={{ fontWeight: '900' }} > My Orders</span>
                                </Link>


                            </div>
                            <div class='mt-2'>
                                <ButtonTeal
                                    label='Sign out'
                                    _onClick={_signOut}
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