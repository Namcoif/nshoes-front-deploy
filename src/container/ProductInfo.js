import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import pageActions from '../redux/actions/pageActions';
import HandleFunction from '../handle_function/HandleFunction';
import { AiOutlineHeart, AiOutlinePercentage } from 'react-icons/ai'
import '../css/DropDown.css'
import DropDown from './../_sharecomponents/dropdown/DropDown';
import ButtonIcon from './../_sharecomponents/button/ButtonIcon';
import CustomButton from './../_sharecomponents/button/CustomButton';
import listAPI_Back from './../api/API';
import ButtonTeal from './../_sharecomponents/button/ButtonTeal';
import { Alert, Button, Dialog, DialogContent, Rating } from '@mui/material';
import MoreToLove from './MoreToLove';
import { CiUser } from 'react-icons/ci';
import FormUpdateProduct from '../_sharecomponents/form/FormUpdateProduct';
import './Container.css'
import FormDeleteProduct from '../_sharecomponents/form/FormDeleteProduct';
import userActions from '../redux/actions/userActions';
import actionTypes from '../redux/constant/constant';
function ProductInfo(props) {

    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selector = useSelector(state => state);

    const [product, setProduct] = useState('');

    const [linkImg, setLinkImg] = useState('');

    const [sizes, setSizes] = useState([]);

    const [rates, setRates] = useState([]);

    const [starPoint, setStarPoint] = useState(3);

    const [percent, setPercent] = useState('');

    const sizeCm = [22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 2.5];

    const [dropDown, setDropDown] = useState(false);

    const [shipping, setShipping] = useState(30000);

    const [currentSize, setCurrentSize] = useState(40);

    const [categoryId, setCategoryId] = useState(1);

    const [productSuggest, setProductSuggest] = useState([]);

    const [toggleAddCart, setToggleAddCart] = useState(false);

    const [isNotLogged, setIsNotLogged] = useState(false);

    const [toggleSignIn, setToggleSignIn] = useState(false);

    const [isUpdateProduct, setIsupdateProduct] = useState(false);

    const [isDeleteProduct, setIsDeleteProduct] = useState(false);

    const [resAdd, setResAdd] = useState('add');

    const [productWillGet, setProductWillGet] = useState({
        product: {
            id: 0
        },
        user: {
            id: localStorage.userId
        },
        size: 40,
        quantity: 1
    })

    const moreInfo = ['Description', "Reviews"];

    const [currentInfo, setCurrentInfo] = useState('Description');

    const _getProduct = async () => {
        dispatch({
            type: actionTypes.GET_MORE_TO_LOVE_REQUEST
        })
        await axios.get(listAPI_Back.GET_PRODUCT + '/' + productId).then(async (res) => {
            const product = res.data
            await axios.get(listAPI_Back.GET_LIST_PRODUCTS, {
                params: {
                    categoryId: product.categoryId
                }
            })
                .then((res) => {
                    console.log(res);
                    setProductSuggest(res.data.content)
                    dispatch({
                        type: actionTypes.GET_MORE_TO_LOVE_SUCCESS
                    })
                })
            setProduct(product)

            console.log(product);

            setLinkImg(product.productImgUrls[0].url)
            setPercent(Math.floor((1 - product.promotionPrice / product.originalPrice) * 100))
            setSizes(product.productSizes)
            setRates(product.productRates)

            let starPoint = 0;
            product.productRates.forEach(element => {
                starPoint += element.star;
                console.log(element);
            });

            starPoint = starPoint / product.productRates.length;
            setStarPoint(starPoint.toFixed(1))

            // setCategoryId(product.categoryId)
            setProductWillGet({
                ...productWillGet,
                product: {
                    id: product.id
                }
            })


        })


    }

    const _closeFormDelete = () => {
        setIsDeleteProduct(false);
    }

    const _closeFormUpdate = () => {
        setIsupdateProduct(false);
    }

    const _trueDropDown = () => {
        setDropDown(true)
    }
    const _falseDropDown = () => {
        setDropDown(false)
    }

    const _incrementQuantity = () => {
        if (productWillGet.quantity < product.quantity) {
            setProductWillGet({
                ...productWillGet,
                quantity: productWillGet.quantity + 1
            })
        }
        console.log(productWillGet.quantity);
    }
    const _decrementQuantity = () => {
        if (productWillGet.quantity > 1) {
            setProductWillGet({
                ...productWillGet,
                quantity: productWillGet.quantity - 1
            })
        }
    }

    const _buyNow = async (productWillGet) => {

        if (localStorage.userId === undefined) {
            dispatch(userActions.toggleSignIn())
        }
        else
            try {
                let user = await axios.get(listAPI_Back.GET_LIST_CARTS_BY_USER_ID, {
                    params: {
                        id: localStorage.userId
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                })

                if (user.data.userId === localStorage.userId) {
                    try {
                        await axios.post(listAPI_Back.ADD_TO_CART, productWillGet, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.token}`
                            }
                        }).then((res) => {
                            setResAdd(res.data.resultText)
                            console.log(res);
                            setToggleAddCart(true)
                            navigate("/api/v1/carts/" + localStorage.userId)
                        })
                    } catch (err) {
                        setIsNotLogged(true)
                    }
                }


            } catch (e) {
                console.log("a");
                dispatch(userActions.toggleSignIn())
            }
    }
    const _addToCart = async (productWillGet) => {

        if (localStorage.userId === undefined) {
            dispatch(userActions.toggleSignIn())
        }
        else
            try {
                let user = await axios.get(listAPI_Back.GET_LIST_CARTS_BY_USER_ID, {
                    params: {
                        id: localStorage.userId
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                })
                    .then((res) => console.log(res))

                if (user.data.userId === localStorage.userId) {
                    try {
                        await axios.post(listAPI_Back.ADD_TO_CART, productWillGet, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.token}`
                            }
                        }).then((res) => {
                            setResAdd(res.data.resultText)
                            console.log(res);
                            setToggleAddCart(true)
                            // navigate("/api/v1/carts/" + localStorage.userId)
                        })
                    } catch (err) {
                        setIsNotLogged(true)
                    }
                }


            } catch (e) {
                console.log("a");
                dispatch(userActions.toggleSignIn())
            }

    }

    const _keepShopping = () => {
        setToggleAddCart(false)
    }

    const _goShoppingCart = () => {
        setToggleAddCart(false)
        navigate("/api/v1/carts/" + localStorage.userId)
    }

    useEffect(() => {
        _getProduct()
        console.log(product);
        console.log(productSuggest);
        if (product.productName === undefined) {
            dispatch(pageActions.changeTitle("NShoes"))
        }
        else
            dispatch(pageActions.changeTitle(product.productName))
        window.scrollTo(0, 0)

    }, [product.productName, productId])

    useEffect(() => {
        setIsupdateProduct(selector.page.isUpdateProduct)
    }, [selector.page])

    useEffect(() => {
        setIsDeleteProduct(selector.user.isDeleteProduct)
    }, [selector.user])
    return (
        <div
            className='flex flex-col'
        >
            <Dialog
                open={isUpdateProduct}
                onClose={_closeFormUpdate}
            >
                <DialogContent>
                    <FormUpdateProduct
                        product={product}
                    />
                </DialogContent>

            </Dialog>



            <Dialog
                open={isDeleteProduct}
                onClose={_closeFormUpdate}
            >
                <DialogContent>
                    <FormDeleteProduct
                        product={product}
                    />
                </DialogContent>

            </Dialog>


            <div
                className='
                mt-28
                justify-center
                flex
                flex-row'>

                <Dialog Dialog
                    open={toggleAddCart} >
                    <DialogContent>
                        <Alert>{resAdd}</Alert>
                        <div
                            className='
                            mt-5
                            flex flex-row'>
                            <CustomButton
                                label="keep shopping"
                                _onClick={_keepShopping}
                            />
                            <div className='w-5'>

                            </div>
                            <ButtonTeal
                                label="Go to shopping cart"
                                _onClick={_goShoppingCart}
                            />
                        </div>
                    </DialogContent>
                </Dialog >

                <div id='img-product'>
                    <div id='main-img' className='main-img'>
                        <img src={linkImg} className='w-96' />
                        <div className="content-img">
                            {
                                product.productStatus == 'ON_SELLING' && product.quantity > 0
                                    ?
                                    null
                                    : (
                                        product.productStatus == 'ON_SELLING' && product.quantity <= 0
                                            ?
                                            <h1>Sold out</h1>
                                            :
                                            <h1>Stop Selling</h1>
                                    )

                            }
                        </div>
                    </div>
                    <div id='other-imgs'>

                    </div>
                </div>
                <div id='info-product'
                    className='
                    flex 
                    flex-col
                    w-1/3
                    lg:w-1/4
                    xl:w-1/3
                    ml-8'>

                    <div className='py-4 border-solid 
                    border-red-vio
                    border-b-2'>
                        <span id='name-product'>{product.productName}</span>
                        <div className='flex items-center
                    '>
                            <span
                                id='promotion-price'
                                className='
                                text-xl
                                font-semibold'>
                                {HandleFunction.formatNumberToVND(product.promotionPrice)}
                            </span>

                            <span
                                id='original-price'
                                className='
                                text-black
                                text-xs
                                line-through
                                ml-3
                                '>
                                {HandleFunction.formatNumberToVND(product.originalPrice)}
                            </span>

                            <span
                                className='
                                flex
                                items-center
                                text-xs
                                p-1
                                ml-3
                                bg-red-vio
                                text-white
                                '>-
                                {percent}
                                <AiOutlinePercentage />
                            </span>

                        </div>
                        <div>
                            <Rating name="half-rating-read" value={starPoint} precision={0.5} readOnly />
                        </div>

                    </div>
                    <div
                        id='size'
                        className='
                            py-4
                            border-solid 
                            border-red-vio  
                            text-red-vio underline
                            border-b-2'>
                        <span>Size: {productWillGet.size}</span>

                        <div className='flex'>
                            {
                                sizes.map((item) => {
                                    return <DropDown
                                        Drop={() => {
                                            if (item.size == currentSize) {
                                                return <div
                                                >

                                                    <button
                                                        className='
                                                        text-xs
                                                        border-4 border-solid border-red-vio
                                                        rounded
                                                        mr-2
                                                        p-2
                                                        hover:border-red-vio'
                                                        onFocus={() => {
                                                            setProductWillGet({
                                                                ...productWillGet,
                                                                size: item.size

                                                            })
                                                            setCurrentSize(item.size)
                                                        }}
                                                    >

                                                        {item.size}

                                                    </button>
                                                </div>
                                            }
                                            return <div
                                            >

                                                <button
                                                    className='
                                                        text-xs
                                                        border-2 border-solid border-gray-500
                                                        rounded
                                                        mr-2
                                                        p-2
                                                        hover:border-red-vio'
                                                    onFocus={() => {
                                                        setProductWillGet({
                                                            ...productWillGet,
                                                            size: item.size

                                                        })
                                                        setCurrentSize(item.size)
                                                    }}
                                                >

                                                    {item.size}

                                                </button>
                                            </div>
                                        }


                                        }
                                        DropContent={() =>
                                            <div className='flex flex-col items-center mt-1 p-5 rounded bg-white shadow-black2 text-xs'>
                                                <span>Manufacturer Size</span>
                                                <div className='flex flex-row justify-between mt-4'>
                                                    <span className=''>Heel to Toe</span>
                                                    <span className='bg-teal-500 px-1 rounded ml-5 '>{sizeCm[item.size - 35]}cm</span>
                                                </div>
                                            </div>
                                        }
                                    />
                                })
                            }
                        </div>
                        <div className='text-red-vio underline'>
                            {/* <span>
                            Slected: {productWillGet.size}
                        </span> */}
                        </div>
                    </div>
                    <div
                        id='quantity'
                        className='
                            flex
                            flex-row items-center content-center
                            py-4
                            '>
                        <span className='mr-2'>Quantity</span>

                        <ButtonIcon
                            label='-'
                            _onClick={_decrementQuantity}
                        />
                        <span className='mx-2'>{productWillGet.quantity}</span>
                        <ButtonIcon
                            label='+'
                            _onClick={_incrementQuantity}
                        />
                    </div>
                    <div
                        id='shipping'
                    >
                        <span>Shipping: {HandleFunction.formatNumberToVND(shipping)}</span>
                    </div>
                    <div id='control-product'                    >
                        {
                            localStorage.role !== '[MANAGER]' ?
                                <div
                                    className='flex flex-row justify-between 2xl:w-1/2 py-4'>
                                    <CustomButton
                                        label='buy now'
                                        _onClick={() => _buyNow(productWillGet)}
                                    />
                                    <ButtonTeal
                                        label='add to cart'
                                        _onClick={() => _addToCart(productWillGet)}
                                    />
                                </div> :
                                <div
                                    className='flex flex-row justify-between 2xl:w-1/2 py-4'>
                                    <CustomButton
                                        label='Update'
                                        _onClick={() => {
                                            dispatch(pageActions.openUpdateProduct())
                                        }}
                                    />
                                    <ButtonTeal
                                        label='Delete'
                                        _onClick={() => {
                                            dispatch(userActions.openDeleteProduct())
                                        }}
                                    />
                                </div>
                        }
                    </div>

                </div>
            </div >
            <div
                id='more-info'
                className='
                    lg:px-60
                    xl:px-72
                    2xl:px-96
                    flex flex-col'
            >
                <div
                    id='header-more-info'
                    className='
                    shadow-md
                        pt-4
                        mb-6
                        flex
                        flex-row
                        items-center
                        justify-center
                    '>
                    {
                        moreInfo.map((item) => {
                            if (currentInfo == item) {
                                return <div className='shadow-lg -mb-5 mx-2'>
                                    <Button
                                        color='error'
                                        variant='contained'
                                        onClick={() => {
                                            setCurrentInfo(item)
                                        }}

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

                                            setCurrentInfo(item)
                                        }}
                                    >
                                        {item}
                                    </Button>
                                </div>

                            }
                        })
                    }
                </div>
                <div
                    id='body-more-info'
                    className='
                        px-52'
                >
                    {
                        currentInfo == 'Description' ?
                            <div>
                                {product.description}
                            </div>
                            :
                            (currentInfo == 'Reviews' ?
                                <div className=''>
                                    {rates.map((item) => {
                                        return <div className='flex flex-col border-b-2 border-gray-500 py-3'>
                                            <div className='flex flex-row items-center'>
                                                <CiUser />
                                                <span className='text-xs'>{item.user.fullName + ','}</span>
                                                &nbsp;
                                                <span className='text-gray-500 text-xs'>{new Date(item.rateDate).toLocaleString()}</span>
                                            </div>
                                            <Rating name="read-only" value={item.star} readOnly />

                                            <span>{item.comment}</span>
                                        </div>
                                    })}
                                </div> : null
                            )
                    }
                </div>
            </div>


            <div
                id='more-to-love'
                className='mt-2'>
                <MoreToLove
                    products={productSuggest}
                />
            </div>
        </div >

    );
}

export default ProductInfo;