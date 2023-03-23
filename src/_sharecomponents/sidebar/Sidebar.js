import React from 'react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Sidebar.css'
function Sidebar(props) {
    const { itemsSidebar } = props

    const [itemsSidebarIN, setItemsSidebarIN] = useState([]);
    useEffect(() => {
        setItemsSidebarIN(itemsSidebar);
    }, [itemsSidebar])
    return (
        <div
            class='    
                    w-64
                    flex flex-col
                    px-2
                    py-2
                    bg-red-300
                    h-min
                    border-2 border-white border-solid
                    rounded-lg'>
            {
                itemsSidebarIN.map((item) => {
                    return <Link to={item.link} className='link' >
                        <span>{item.itemSidebarName}</span>
                    </Link>
                })
            }

        </div>
    );
}

export default Sidebar;