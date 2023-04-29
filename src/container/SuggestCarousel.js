import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom';
function SuggestCarousel(props) {
    const { itemCarousel } = props
    console.log(itemCarousel);

    return (
        <div className=''>
            <div className='flex flex-col items-center pb-5 -mt-10'>
                <h2 style={
                    { fontFamily: 'Brush Script MT' }
                }>
                    Bestseller
                </h2>
            </div>
            <div>
                <Carousel
                    indicators={false}
                    navButtonsAlwaysVisible={true}
                    animation="fade"
                >

                    {
                        itemCarousel.filter((item) => {
                            return item.productImgUrls[0].url !== "null"
                        }).map((item) => {
                            return (
                                <Link to={'/api/v1/products/' + item.id}>
                                    <div className='flex flex-col items-center'>
                                        {item.productImgUrls[0].url !== undefined ?
                                            <img key={item.productImgUrls[0].url.substring(10, 15)} src={item.productImgUrls[0].url} className=''></img>
                                            : null}
                                    </div>
                                </Link>
                            )
                        })
                    }
                </Carousel>
            </div>


        </div >
    );
}

export default SuggestCarousel;