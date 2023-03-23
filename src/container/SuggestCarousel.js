import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom';
function SuggestCarousel(props) {
    const { itemCarousel } = props
    console.log(itemCarousel);

    return (
        <div class='
                    
                    bg-red-400
                    '>
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
                                <div class='flex flex-col items-center'>
                                    {item.productImgUrls[0].url !== undefined ?
                                        <img key={item.productImgUrls[0].url.substring(10, 15)} src={item.productImgUrls[0].url}></img>
                                        : null}
                                </div>
                            </Link>


                        )

                    })
                }
            </Carousel>

        </div>
    );
}

export default SuggestCarousel;