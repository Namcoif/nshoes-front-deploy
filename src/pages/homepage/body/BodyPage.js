import React, { useEffect, useState } from 'react';
import listAPI_Back from '../../../api/API';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import pageActions from './../../../redux/actions/pageActions';
import SuggestCarousel from './../../../container/SuggestCarousel';
import MoreToLove from './../../../container/MoreToLove';
import Sidebar from '../../../_sharecomponents/sidebar/Sidebar';
import NavigatePage from './../../../_sharecomponents/navigatepage/NavigatePage';

function BodyPage(props) {

    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [sellingProducts, setSellingProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);

    const [totalPages, setTotalPages] = useState([]);

    const managerSidebar = [
        {
            id: "product",
            link: "/",
            itemSidebarName: "Products Management"
        },
        {
            id: "categỏy",
            link: "/api/v1/categories/management",
            itemSidebarName: "Categories Management"
        },
        {
            id: "order",
            link: "/api/v1/orders/management",
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

    }, [])


    return (

        // <div
        //     class="
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
            class="
                min-w-full 
                mt-28
                ">
            <div
                id='home-firstscreen'
                class='
                       
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
                    class='
                        w-96'>
                    <SuggestCarousel
                        itemCarousel={sellingProducts}
                    />
                </div>
            </div>
            <div id='sales'>
            </div>
            <div id='more-to-love'>
                <MoreToLove
                    products={products}
                />
            </div>
            <div
                id='page-number'
                class=''>
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