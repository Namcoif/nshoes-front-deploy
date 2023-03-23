import React, { useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import CustomButton from '../../../_sharecomponents/button/CustomButton';
import CustomSearch from '../../../_sharecomponents/input/CustomSearch';
import { CiUser } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from '../../../_sharecomponents/dropdown/DropDown';
import ButtonTeal from './../../../_sharecomponents/button/ButtonTeal';
import { connect, useDispatch, useSelector } from 'react-redux';
import userActions from '../../../redux/actions/userActions';
import pageActions from './../../../redux/actions/pageActions';
import './Header.css'
function HeaderAnonymous(props) {


    const selector = useSelector(state => state)
    const dispatch = useDispatch();


    const navigate = useNavigate();
    const [search, setSearch] = useState();

    const _getSearchValue = (search) => {
        setSearch(search)
    }

    const _searchProducts = () => {
        dispatch(userActions.getProductNameSearch(search))
    }

    const _siginIn = () => {
        navigate('/sign-in');
    }


    return (
        <div
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
                <CustomSearch
                    class='flex-1'
                    placeholder="Search..."
                    _getInputValue={_getSearchValue}
                    _onClick={_searchProducts}
                />
            </div>
            <div
                id='customer'
                class='
                            mr-1
                            flex
                            flex-row
                            items-center
                    '
            >
                <CiShoppingCart
                    class='
                                h-8
                                w-8
                                mr-1'
                />
                <DropDown
                    Drop={
                        () => <CiUser
                            class='
                                    h-8
                                    w-8'
                        />
                    }
                    DropContent={
                        () => <div class='flex flex-col items-center p-5 rounded bg-white shadow-black2 text-xs'>
                            <span>Welcom to NShoes!</span>
                            <div class='flex flex-row justify-between items-center mt-5'>
                                <CustomButton
                                    onclick={() => { dispatch(userActions.toggleSignUp()) }}

                                    label='Register'

                                />
                                <div class='w-3'></div>
                                <ButtonTeal
                                    onclick={() => { dispatch(userActions.toggleSignIn()) }}
                                    label='Sign in'
                                />
                            </div>
                        </div>
                    }
                />
            </div>

        </div >

    );
}

export default HeaderAnonymous;