import React from 'react';
import Carousel from 'react-material-ui-carousel'
function SuggestCarousel(props) {
    const { itemCarousel } = props
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
                    itemCarousel.map((item) => {
                        return (
                            <div class='flex flex-col items-center'>
                                {item.link !== undefined ?
                                    <img key={item.link.substring(10, 15)} src={item.link}></img>
                                    : null}
                            </div>

                        )

                    })
                }
            </Carousel>

        </div>
    );
}

export default SuggestCarousel;