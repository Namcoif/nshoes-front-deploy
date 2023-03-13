import React from 'react';
import { NavLink } from 'react-router-dom';
import './CustomLinks.css'
function CustomLinks(props) {
    const { menuLinks } = props;
    return (
        <div class='
                flex flex-col
                justify-center
                my-2
                w-full
                
                '>
            {
                menuLinks.map((item, index) =>
                    <NavLink
                        key={item.text}
                        to={item.link}
                        className='link'

                    >
                        <span
                            class='
                                hover:text-red-vio'>
                            {item.text}
                        </span>
                    </NavLink>
                )
            }
        </div>
    );
}

export default CustomLinks;