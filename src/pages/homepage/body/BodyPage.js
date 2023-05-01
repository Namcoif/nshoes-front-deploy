import React, { useEffect, useState } from 'react';
import listAPI_Back from '../../../api/API';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import pageActions from './../../../redux/actions/pageActions';
import SuggestCarousel from './../../../container/SuggestCarousel';
import MoreToLove from './../../../container/MoreToLove';
import Sidebar from '../../../_sharecomponents/sidebar/Sidebar';
import NavigatePage from './../../../_sharecomponents/navigatepage/NavigatePage';
import FormCreateProduct from '../../../_sharecomponents/form/FormCreateProduct';
import { Button, Dialog, DialogContent } from '@mui/material';
import userActions from '../../../redux/actions/userActions';
import Welcome from '../../../container/Welcome';
import CustomCarousel from '../../../_sharecomponents/carousel/CustomCarousel';

function BodyPage(props) {

    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [sellingProducts, setSellingProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);

    const [totalPages, setTotalPages] = useState([]);

    const [isCreateProduct, setIsCreateProduct] = useState(false);

    const managerSidebar = [
        {
            id: "product",
            link: "/",
            itemSidebarName: "Products Management"
        },
        {
            id: "category",
            link: "/api/v1/categories/management",
            itemSidebarName: "Categories Management"
        },
        {
            id: "order",
            link: "/api/v1/orders-management/ /1",
            itemSidebarName: "Orders Management"
        },
        {
            id: "statistical",
            link: "/api/v1/statistical/management",
            itemSidebarName: "Statistical Management"
        },
    ]

    const _getProducts = (pageNumber = 0) => {
        dispatch(pageActions.getProducts(pageNumber)).then((res) => {
            const products = res.data.content
            console.log(products);
            setProducts(products)
            console.log(res.data)
            setTotalPages(Array.from(Array(res.data.totalPages).keys()))
        })
        window.scrollTo(0, 0)
    }

    const _getSellingProducts = async () => {
        await axios.get(listAPI_Back.GET_SELLING_PRODUCTS).then((res) => {
            setSellingProducts(res.data)
        })
    }

    const _getDiscountProducts = async () => {
        await axios.get(listAPI_Back.GET_DISCOUNT_PRODUCTS).then((res) => {
            setDiscountProducts(res.data)
        })
    }

    const _getCategories = async () => {
        await axios.get(listAPI_Back.GET_LIST_CATEGORIES).then((res) => {
            const categoryTemp = res.data.map((item) => {
                return {
                    id: item.id,
                    link: "/api/v1/products/search/" + item.id + "/%20/%20/%20/%20",
                    itemSidebarName: item.categoryName
                }
            })

            setCategories(categoryTemp)
            console.log(categoryTemp);
        })

    }

    useEffect(() => {
        _getProducts();
        _getSellingProducts();
        _getCategories();
        _getDiscountProducts()
    }, [])

    useEffect(() => {
        setIsCreateProduct(selector.user.isCreateProduct)
    }, [selector.user.isCreateProduct])
    return (

        // <div
        //     className="
        //             min-w-full 
        //             mt-28 

        //             md:pl-24 
        //             md:pr-24 

        //             lg:pl-32
        //             lg:pr-32

        //             xl:pl-52
        //             xl:pr-52

        //             2xl:pl-80
        //             2xl:pr-80

        //             ">
        <div
            className="
                min-w-full 
                mt-24
                flex flex-col
                ">
            <Dialog
                open={isCreateProduct}
                onClose={() => {
                    dispatch(userActions.openCreateProduct())

                }}
                fullWidth
            >
                <DialogContent>
                    <FormCreateProduct
                    />
                </DialogContent>

            </Dialog>
            <div className=''>
                <Welcome />
            </div>
            <div
                id='home-firstscreen'
                className='
                    py-10
                    flex flex-row
                    
                    justify-center'>
                <div
                    id='category'
                >
                    {
                        localStorage.role == '[MANAGER]'
                            ?
                            <Sidebar
                                itemsSidebar={managerSidebar}
                                itemActive='product'

                            />
                            :
                            <Sidebar
                                itemsSidebar={categories}
                            />
                    }
                </div>
                <div id='suggest-carousel'
                    className='
                    flex flex-col justify-center
                        w-96'>
                    <SuggestCarousel
                        itemCarousel={sellingProducts}
                    />
                </div>
            </div>
            <div id='sales'
                className=' '
            >
                <CustomCarousel
                    itemCarousel={discountProducts}
                />
            </div>
            {
                localStorage.role == '[MANAGER]'
                    ? <div className='w-1/2 flex flex-col items-center mb-3'>

                        <Button
                            variant='contained'
                            onClick={() => {
                                dispatch(userActions.openCreateProduct())
                            }}
                        >
                            Create New Product
                        </Button>
                    </div>
                    : null
            }

            <div id='more-to-love'>
                <MoreToLove
                    products={products}
                />
            </div>
            <div
                id='page-number'
                className=''>
                {/* {navigatePage} */}
                <NavigatePage
                    totalPages={totalPages}
                    _onClick={(item) => {
                        _getProducts(item + 1)
                        setCurrentPage(item)
                    }}
                />
            </div>
        </div>
    );
}

export default BodyPage;