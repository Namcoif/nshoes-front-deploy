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
import NavigatePage from '../_sharecomponents/navigatepage/NavigatePage';

function SearchProducts(props) {


    const dispatch = useDispatch();

    const refSubmit = useRef();

    const filterParams = useParams();

    const navigate = useNavigate();

    const selector = useSelector(state => state);

    const [filter, setFilter] = useState({
        categoryId: filterParams.categoryId != '' ? filterParams.categoryId : '%20',
        pageNumber: '%20',
        productName: filterParams.productName != '' ? filterParams.productName : '%20',
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
            window.scrollTo(0, 0)

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
            className='bg-red-vio text-white flex flex-row items-center justify-center' ref={refSubmit} onClick={onClick}>
            <CiSearch size={"30px"} />
        </button>
    }

    const _searchProducts = () => {
        navigate(("/api/v1/products/search/" + filter.categoryId + "/" + filter.productName + "/" + filter.minPrice + "/" + filter.maxPrice + "/" + filter.pageNumber))
    }

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

    }, [filter.pageNumber, filter.categoryId])

    useEffect(() => {
        setFilter({
            categoryId: filterParams.categoryId != '' ? filterParams.categoryId : '%20',
            pageNumber: '1',
            productName: filterParams.productName != '' ? filterParams.productName : '%20',
            minPrice: '%20',
            maxPrice: '%20'
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
            className='
                mt-28
                flex flex-row
                justify-center'>
            <div className=''>
                <div className='sticky top-28'>
                    <div
                        className='
                            font-bold px-2 hover:shadow-2xl cursor-pointer'

                        onClick={() => setFilter({
                            ...filter,
                            categoryId: '%20'
                        })}
                    >
                        <h2

                        >
                            All
                        </h2>
                    </div>

                    <Sidebar
                        itemsSidebar={categories}
                        itemActive={filterParams.categoryId}
                    />
                </div>
            </div>
            <div className=''>

                <div
                    id='search-head'
                    className='flex flex-row'>
                    <div className='w-1/2'>
                        <div className=''>
                            <CustomInput
                                type="text"
                                Icon={() => ComponentSearch(_searchProducts)}
                                _getInputValue={_getInfoProductsSearch}
                                placeholder="Shoes for women..."
                                name="productName"
                            />
                        </div>
                        <div
                            className='flex flex-row'>
                            <CustomInput
                                Icon={BiDollar}
                                type="text"
                                _getInputValue={_getInfoProductsSearch}
                                placeholder="Min"
                                name="minPrice"
                            />
                            <div className='w-4'></div>
                            <CustomInput
                                Icon={BiDollar}
                                type="text"
                                _getInputValue={_getInfoProductsSearch}
                                placeholder="Max"
                                name="maxPrice"

                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center flex-1 '>
                        <span>Result for: </span>
                        <span className='text-3xl'>{filterParams.productName}</span>
                    </div>
                </div>
                <div
                    id='search-body'
                    className='
                        flex flex-row'>

                    <div>
                        <MoreToLove
                            products={searchedProducts}
                        />
                    </div>

                </div>
                <div
                    id='page-number'
                    className=''>
                    <NavigatePage
                        totalPages={totalPages}
                        _onClick={(item) => {
                            setFilter({
                                ...filter,
                                pageNumber: item + 1
                            })
                            console.log(item);
                        }}
                    />
                </div>
            </div>
        </div >

    );
}

export default SearchProducts;