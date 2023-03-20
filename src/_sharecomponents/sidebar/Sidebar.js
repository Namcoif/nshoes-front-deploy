import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
function Sidebar(props) {
    const { itemsSidebar } = props
    useEffect(() => {
        console.log(itemsSidebar);
    }, [])
    return (
        <div
            class='
                        w-64
                        flex flex-col
                        px-2
                        py-2
                        bg-red-300
                        border-2 border-white border-solid
                        rounded-lg'>
            {
                itemsSidebar.map((item) => {
                    return <Link to={item.link} className='link'                    >
                        <span>{item.itemSidebarName}</span>
                    </Link>
                })
            }

        </div>
    );
}

export default Sidebar;