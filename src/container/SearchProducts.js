import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import listAPI_Back from '../api/API';
import axios from 'axios';
import MoreToLove from './MoreToLove';

function SearchProducts(props) {

    const dispatch = useDispatch();

    const [filter, setFilter] = useState(useParams());

    const [searchedProducts, setSearchedProducts] = useState([]);

    const _getProductsSearch = async (filter) => {
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
            console.log(res.data.content);
        })
    }


    useEffect(() => {
        console.log(filter);
        _getProductsSearch(filter);
        console.log(searchedProducts);
    }, [])
    return (
        <div
            class='mt-28'>
            <div
                id='search-head'
                class=''>

            </div>
            <MoreToLove
                products={searchedProducts}
            />
        </div>
    );
}

export default SearchProducts;