import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import listAPI_Back from '../api/API';
import axios from 'axios';
import MoreToLove from './MoreToLove';
import Sidebar from './../_sharecomponents/sidebar/Sidebar';
import CustomInput from './../_sharecomponents/input/CustomInput';

import { BiDollar } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci';

function SearchProducts(props) {


    const dispatch = useDispatch();

    const filterParams = useParams();

    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        categoryId: '%20',
        pageNumber: '%20',
        productName: '%20',
        minPrice: '%20',
        maxPrice: '%20'
    });

    const [searchedProducts, setSearchedProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [prices, setPrices] = useState({
        minPrice: 0,
        maxPrice: 10000000
    })

    const _getPricesSearch = (name, value) => {
        setFilter({
            ...filter,
            [name]: value
        })
        if (filter.minPrice == '') {
            setFilter({
                ...filter,
                minPrice: '%20'
            })
        }
        if (filter.maxPrice == '') {
            setFilter({
                ...filter,
                maxPrice: '%20'
            })
        }
    }
    const _getProductsSearch = async (filter) => {
        console.log(filter.categoryId);
        await axios.get(listAPI_Back.GET_LIST_PRODUCTS, {
            params: {
                categoryId: filter.categoryId,
                pageNumber: filter.pageNumber,
                productName: filter.productName,
                minPrice: filter.minPrice,
                maxPrice: filter.maxPrice
            }
        }).then((res) => {
            setSearchedProducts(res.data.content)
            // console.log(res.data.content);
        })
    }

    const _getCategories = async () => {
        await axios.get(listAPI_Back.GET_LIST_CATEGORIES).then((res) => {
            const categoryTemp = res.data.map((item) => {
                return {
                    link: "/api/v1/products/search/" + item.id + "/%20/%20/%20/%20",
                    itemSidebarName: item.categoryName
                }
            })

            setCategories(categoryTemp)
            // console.log(categoryTemp);
        })

    }

    const _searchProducts = () => {
        navigate(("/api/v1/products/search/" + filter.categoryId + "/" + filter.productName + "/" + filter.minPrice + "/" + filter.maxPrice + "/" + filter.pageNumber))
    }


    useEffect(() => {
        console.log(filterParams.maxPrice);
        _getProductsSearch(filterParams);
        _getCategories();
        console.log(useParams);
        console.log(searchedProducts);
    }, [filterParams])

    return (
        <div
            class='
                mt-28
                flex flex-col
                items-center'>
            <div
                id='search-head'
                class=''>
                <h1>{filter.minPrice}</h1>
                {console.log(filter.minPrice)}
                <div
                    class='flex flex-row w-52 bg-red-300'>
                    <CustomInput
                        Icon={BiDollar}
                        type="text"
                        _getInputValue={_getPricesSearch}
                        placeholder="Min"
                        name="minPrice"
                    />
                    <CustomInput
                        Icon={BiDollar}
                        type="text"
                        _getInputValue={_getPricesSearch}
                        placeholder="Max"
                        name="maxPrice"
                    />
                    <CiSearch onClick={_searchProducts} />
                </div>


            </div>
            <div
                id='search-body'
                class='
                    flex flex-row'>
                <div
                    class='
                    t-0
                    h-fit'
                >

                    <Sidebar
                        itemsSidebar={categories}
                    />
                </div>
                <div>
                    <MoreToLove
                        products={searchedProducts}
                    />
                </div>

            </div>

        </div>
    );
}

export default SearchProducts;