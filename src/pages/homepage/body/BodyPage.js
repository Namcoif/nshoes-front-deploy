import React, { useEffect, useState } from 'react';
import listAPI_Back from '../../../api/API';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import pageActions from './../../../redux/actions/pageActions';
import { Link } from 'react-router-dom';
import SuggestCarousel from './../../../container/SuggestCarousel';
import MoreToLove from './../../../container/MoreToLove';
import Sidebar from '../../../_sharecomponents/sidebar/Sidebar';

function BodyPage(props) {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [sellingProducts, setSellingProducts] = useState([]);


    const _getProducts = () => {
        dispatch(pageActions.getProducts()).then((res) => {
            const products = res.data.content
            console.log(products);
            setProducts(products)
        })

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
                    link: "api/v1/products/search/" + item.id + "/%20/%20/%20/%20",
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

                    <Sidebar
                        itemsSidebar={categories}
                    />

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

        </div>
    );
}

export default BodyPage;