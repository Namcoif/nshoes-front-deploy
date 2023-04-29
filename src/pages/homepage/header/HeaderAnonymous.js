import React, { useState, useRef } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import CustomButton from '../../../_sharecomponents/button/CustomButton';
import CustomSearch from '../../../_sharecomponents/input/CustomSearch';
import { CiUser } from 'react-icons/ci';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DropDown from '../../../_sharecomponents/dropdown/DropDown';
import ButtonTeal from './../../../_sharecomponents/button/ButtonTeal';
import { connect, useDispatch, useSelector } from 'react-redux';
import userActions from '../../../redux/actions/userActions';
import pageActions from './../../../redux/actions/pageActions';
import './Header.css'
function HeaderAnonymous(props) {


    const selector = useSelector(state => state)
    const dispatch = useDispatch();

    const refSubmit = useRef();

    const params = useParams();

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const _getSearchValue = (name, value) => {
        setSearch(value)
    }

    const _searchProducts = () => {
        dispatch(userActions.getProductNameSearch(search))
    }

    const _siginIn = () => {
        navigate('/sign-in');
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
                className='
                            ml-1
                            md:ml-4
                            flex
                            flex-row
                            items-center
                    '
            >
                {/* <CiShoppingCart
                    className='
                                h-8
                                w-8
                                mr-1'
                /> */}
                <DropDown
                    Drop={
                        () => <CiUser
                            color="white"
                            className='
                                    h-8
                                    w-8'
                        />
                    }
                    DropContent={
                        () => <div className='flex flex-col items-center p-5 rounded bg-white shadow-black2 text-xs'>
                            <span>Welcom to NShoes!</span>
                            <div className='flex flex-row justify-between items-center mt-5'>
                                <CustomButton
                                    _onClick={() => { dispatch(userActions.toggleSignIn()) }}
                                    label='Sign in'
                                />
                                <div className='w-3'></div>

                                <ButtonTeal
                                    _onClick={() => { dispatch(userActions.toggleSignUp()) }}

                                    label='Register'

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