import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cate(props) {
    const [product, setProduct] = useState('');

    const _getProduct = async () => {
        await axios.get("http://localhost:8080/api/v1/products/1").then((res) => {
            const product = res.data
            setProduct(product)
            console.log(product);

        })

    }
    useEffect(() => {
        _getProduct()
    }, [])
    return (
        <div>
            CAtge
            {product.productName}
        </div>
    );
}

export default Cate;