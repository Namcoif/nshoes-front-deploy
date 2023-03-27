import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import pageActions from '../redux/actions/pageActions';
import HandleFunction from '../handle_function/HandleFunction';
import { AiOutlinePercentage } from 'react-icons/ai'
import '../css/DropDown.css'
import DropDown from './../_sharecomponents/dropdown/DropDown';
import ButtonIcon from './../_sharecomponents/button/ButtonIcon';
import CustomButton from './../_sharecomponents/button/CustomButton';
import listAPI_Back from './../api/API';
import ButtonTeal from './../_sharecomponents/button/ButtonTeal';
import { Alert, Dialog, DialogContent } from '@mui/material';
import MoreToLove from './MoreToLove';
function ProductInfo(props) {

    const { pr } = props
    // const path = window.location.pathname;
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState('');

    const [linkImg, setLinkImg] = useState('');

    const [sizes, setSizes] = useState([]);

    const [percent, setPercent] = useState('');

    const sizeCm = [22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 2.5];

    const [dropDown, setDropDown] = useState(false);

    const [shipping, setShipping] = useState(30000);

    const [currentSize, setCurrentSize] = useState(40);

    const [categoryId, setCategoryId] = useState(1);

    const [productSuggest, setProductSuggest] = useState([]);

    const [toggleAddCart, setToggleAddCart] = useState(false);
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

    const _getProduct = async () => {

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
                })
            setProduct(product)

            setLinkImg(product.productImgUrls[0].url)
            setPercent(Math.floor((1 - product.promotionPrice / product.originalPrice) * 100))
            setSizes(product.productSizes)


            // setCategoryId(product.categoryId)
            setProductWillGet({
                ...productWillGet,
                product: {
                    id: product.id
                }
            })


        })


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

    const _buyNow = () => { }

    const _addToCart = async (productWillGet) => {

        console.log(productWillGet);
        console.log(`Bearer ${localStorage.token}`);
        await axios.post(listAPI_Back.ADD_TO_CART, productWillGet, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then((res) => {
            setResAdd(res.data.resultText)
            console.log(res);
            setToggleAddCart(true)
        })

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

    return (
        <div>

            < div
                class='
                bg-slate-100
                mt-28
                justify-center
                flex
                flex-row'>
                <Dialog Dialog
                    open={toggleAddCart} >
                    <DialogContent>
                        <Alert>{resAdd}</Alert>
                        <div
                            class='
                            mt-5
                            flex flex-row'>
                            <CustomButton
                                label="keep shopping"
                                onclick={_keepShopping}
                            />
                            <div class='w-5'>

                            </div>
                            <ButtonTeal
                                label="Go to shopping cart"
                                onclick={_goShoppingCart}
                            />
                        </div>
                    </DialogContent>
                </Dialog >

                <div id='img-product'>
                    <div id='main-img'>
                        <img src={linkImg} class='w-96' />
                    </div>
                    <div id='other-imgs'>

                    </div>
                </div>
                <div id='info-product'
                    class='
                    flex 
                    flex-col
                    w-1/3
                    lg:w-1/4
                    xl:w-1/3
                    ml-8'>

                    <div class='py-4 border-solid 
                    border-red-vio
                    border-b-2'>
                        <span id='name-product'>{product.productName}</span>
                        <div class='flex items-center
                    '>
                            <span
                                id='promotion-price'
                                class='
                                text-xl
                                font-semibold'>
                                {HandleFunction.formatNumberToVND(product.promotionPrice)}
                            </span>

                            <span
                                id='original-price'
                                class='
                                text-black
                                text-xs
                                line-through
                                ml-3
                                '>
                                {HandleFunction.formatNumberToVND(product.originalPrice)}
                            </span>

                            <span
                                class='
                                flex
                                items-center
                                text-xs
                                ml-3
                                bg-red-400
                                text-red-vio
                                '>
                                {percent}
                                <AiOutlinePercentage />
                            </span>
                        </div>
                    </div>
                    <div
                        id='size'
                        class='
                            py-4
                            border-solid 
                            border-red-vio  
                            text-red-vio underline
                            border-b-2'>
                        <span>Size: {productWillGet.size}</span>

                        <div class='flex'>
                            {
                                sizes.map((item) => {
                                    return <DropDown
                                        Drop={() => {
                                            if (item.size == currentSize) {
                                                return <div
                                                >

                                                    <button
                                                        class='
                                                        text-xs
                                                        border-2 border-solid border-red-vio
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
                                                    class='
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
                                            <div class='flex flex-col items-center mt-1 p-5 rounded bg-white shadow-black2 text-xs'>
                                                <span>Manufacturer Size</span>
                                                <div class='flex flex-row justify-between mt-4'>
                                                    <span class=''>Heel to Toe</span>
                                                    <span class='bg-teal-500 px-1 rounded ml-5 '>{sizeCm[item.size - 35]}cm</span>
                                                </div>
                                            </div>
                                        }
                                    />
                                })
                            }
                        </div>
                        <div class='text-red-vio underline'>
                            {/* <span>
                            Slected: {productWillGet.size}
                        </span> */}
                        </div>
                    </div>
                    <div
                        id='quantity'
                        class='
                            flex
                            flex-row items-center content-center
                            py-4
                            '>
                        <span class='mr-2'>Quantity</span>

                        <ButtonIcon
                            label='-'
                            onclick={_decrementQuantity}
                        />
                        <span class='mx-2'>{productWillGet.quantity}</span>
                        <ButtonIcon
                            label='+'
                            onclick={_incrementQuantity}
                        />
                    </div>
                    <div
                        id='shipping'
                    >
                        <span>Shipping: {HandleFunction.formatNumberToVND(shipping)}</span>
                    </div>
                    <div
                        id='control-product'
                        class='flex flex-row justify-between 2xl:w-1/3 w-1/2 py-4'>
                        <CustomButton
                            label='buy now'
                            onclick={_buyNow}
                        />
                        <ButtonTeal
                            label='add to cart'
                            onclick={() => _addToCart(productWillGet)}
                        />
                    </div>
                </div>
            </div >
            <div>
                <MoreToLove
                    products={productSuggest}
                />
            </div>
        </div>

    );
}

export default ProductInfo;