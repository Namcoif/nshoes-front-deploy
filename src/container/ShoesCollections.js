import React from 'react';
import axios from "axios";

function ShoesCollections(props) {

    const options = {
        method: 'GET',
        url: 'https://shoes-collections.p.rapidapi.com/shoes/3',
        headers: {
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
            'X-RapidAPI-Host': 'shoes-collections.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
    return (
        <div>

        </div>
    );
}

export default ShoesCollections;