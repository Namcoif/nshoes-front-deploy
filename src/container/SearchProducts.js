import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import listAPI_Back from '../api/API';
import axios from 'axios';
import MoreToLove from './MoreToLove';
import Sidebar from './../_sharecomponents/sidebar/Sidebar';
import CustomInput from './../_sharecomponents/input/CustomInput';

import { BiDollar } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci';
import CustomSearch from './../_sharecomponents/input/CustomSearch';

function SearchProducts(props) {


    const dispatch = useDispatch();
    const refSubmit = useRef();


    const filterParams = useParams();

    const navigate = useNavigate();

    const selector = useSelector(state => state);

    const [filter, setFilter] = useState({
        categoryId: '%20',
        pageNumber: '%20',
        productName: '%20',
        minPrice: '%20',
        maxPrice: '%20'
    });

    const [totalPages, setTotalPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);


    const [searchedProducts, setSearchedProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            refSubmit.current.focus()
        }
    }

    const _getInfoProductsSearch = (name, value) => {
        setFilter({
            ...filter,
            [name]: value
        })

    }
    const _getProductsSearch = async (filter) => {
        // console.log(filter.categoryId);
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
            setTotalPages(Array.from(Array(res.data.totalPages).keys()))

            // console.log(res.data.content);
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
            // console.log(categoryTemp);
        })

    }

    const ComponentSearch = (onClick) => {
        return <button
            class='bg-red-vio text-white flex flex-row items-center justify-center' ref={refSubmit} onClick={onClick}>
            <CiSearch size={"30px"} />
        </button>
    }

    const _searchProducts = () => {
        navigate(("/api/v1/products/search/" + filter.categoryId + "/" + filter.productName + "/" + filter.minPrice + "/" + filter.maxPrice + "/" + filter.pageNumber))
    }

    const navigatePage = totalPages.map((item) => {
        if (currentPage == item) {
            return <span

                class='mx-1 cursor-pointer border-solid border-red-vio border-2 text-xs w-5 h-5 text-center'
                onClick={() => {
                    setFilter({
                        ...filter,
                        pageNumber: item + 1
                    })
                    setCurrentPage(item)
                    // _searchProducts()
                }}
            >
                {item + 1}
            </span>
        }

        return <span
            class='mx-1 cursor-pointer border-solid border-gray-600 border-2 text-xs w-5 h-5 text-center'
            onClick={() => {
                setFilter({
                    ...filter,
                    pageNumber: item + 1
                })
                setCurrentPage(item)
                // _searchProducts()
            }}
        >
            {item + 1}
        </span>

    })


    useEffect(() => {
        console.log(filter);
        setFilter({
            ...filter,
            categoryId: filterParams.categoryId != '' ? filterParams.categoryId : '%20'
        })
        _getProductsSearch(filterParams);
        _getCategories();

    }, [filterParams])

    useEffect(() => {
        _searchProducts()

    }, [filter.pageNumber])

    useEffect(() => {
        setFilter({
            categoryId: '%20',
            pageNumber: '1',
            productName: '%20',
            minPrice: '%20',
            maxPrice: '%20'
        })
        setFilter({
            ...filter,
            categoryId: filterParams.categoryId != '' ? filterParams.categoryId : '%20'
        })

    }, [])

    useEffect(() => {
        const _filterChange = () => {
            if (filter.productName === '') {
                setFilter({
                    ...filter,
                    productName: '%20'
                })
            }
            if (filter.minPrice === '') {
                setFilter({
                    ...filter,
                    minPrice: '%20'
                })
            }

            if (filter.maxPrice === '') {
                setFilter({
                    ...filter,
                    maxPrice: '%20'
                })
            }
        }
        _filterChange()
    }, [filter])


    return (
        <div
            onKeyDown={_handleKeyDown}
            class='
                mt-28
                flex flex-col
                items-center'>
            <div class>
                <CustomInput
                    type="text"
                    Icon={() => ComponentSearch(_searchProducts)}
                    _getInputValue={_getInfoProductsSearch}
                    placeholder="Shoes for women..."
                    name="productName"
                />
            </div>
            <div
                id='search-head'
                class=''>
                <div
                    class='flex flex-row w-52 bg-red-300'>
                    <CustomInput
                        Icon={BiDollar}
                        type="text"
                        _getInputValue={_getInfoProductsSearch}
                        placeholder="Min"
                        name="minPrice"
                    />
                    <CustomInput
                        Icon={BiDollar}
                        type="text"
                        _getInputValue={_getInfoProductsSearch}
                        placeholder="Max"
                        name="maxPrice"
                    />
                    {/* <CiSearch onClick={_searchProducts} /> */}
                </div>


            </div>
            <div
                id='search-body'
                class='
                    flex flex-row'>
                <div>
                    <div class='sticky top-28'>
                        <Sidebar
                            itemsSidebar={categories}
                            itemActive={filterParams.categoryId}
                        />
                    </div>
                </div>
                <div>
                    <MoreToLove
                        products={searchedProducts}
                    />
                </div>

            </div>
            <div
                id='page-number'
                class='flex flex-row items-center justify-center py-2 bg-white'>
                {navigatePage}
            </div>
        </div>
    );
}

export default SearchProducts;