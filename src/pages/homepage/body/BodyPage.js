import React, { useEffect, useState } from 'react';
import listAPI_Back from '../../../api/API';
import axios from 'axios';
import CustomLinks from './../../../_sharecomponents/customlinks/CustomLinks';
import { menuLinks } from '../../../data/Navigation';
import SuggestCarousel from './SuggestCarousel';
import ProductInfo from './../../../container/ProductInfo';
import MoreToLove from './MoreToLove';
import { useDispatch } from 'react-redux';
import pageActions from './../../../redux/actions/pageActions';
import { Link } from 'react-router-dom';

function BodyPage(props) {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [sellingProducs, setSellingProducs] = useState([]);

    const link = [

    ]

    const _getProducts = () => {
        dispatch(pageActions.getProducts()).then((res) => {
            const products = res.data.content
            const img = res.data.content.map((item) => {
                for (const element of item.productImgUrls) {
                    return {
                        link: element.url
                    }
                }
            })
            console.log(products);
            setProducts(products)
        })

    }

    const _getSellingProducts = async () => {
        await axios.get(listAPI_Back.GET_SELLING_PRODUCTS).then((res) => {
            setSellingProducs(res.data)
        })
    }

    const _getCategories = async () => {
        await axios.get(listAPI_Back.GET_LIST_CATEGORIES).then((res) => {
            const categoryTemp = res.data.map((item) => {
                return {
                    id: item.id,
                    categoryName: item.categoryName
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
                    class='
                        w-64
                        flex flex-col
                        px-2
                        py-2
                        bg-red-300
                        border-2 border-white border-solid
                        rounded-lg'>

                    {/* <CustomLinks
                        menuLinks={menuLinks}
                        menuLinks={categories}
                    /> */}
                    {
                        categories.map((item) => {
                            return <Link to={"api/v1/products/search"}>
                                <div className='link'>
                                    <span>
                                        {
                                            item.categoryName
                                        }
                                    </span>
                                </div>
                            </Link>
                        })
                    }

                </div>
                <div id='suggest-carousel'
                    class='
                                w-96'>
                    <SuggestCarousel
                        itemCarousel={sellingProducs}
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