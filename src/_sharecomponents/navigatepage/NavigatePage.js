import React from 'react';
import { useState } from 'react';

function NavigatePage(props) {
    const { totalPages, _getProducts, _onClick } = props
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <div class='flex flex-row items-center justify-center py-2 bg-white'>
            {totalPages.map((item) => {
                if (currentPage == item) {
                    return <div
                    class='mx-1 cursor-pointer border-solid border-red-vio border-2 text-xs w-5 h-5 text-center'

                    >
                        <span

                            onClick={() => {
                                setCurrentPage(item)
                                _onClick(item)
                            }}
                        >
                            {item + 1}
                        </span>
                    </div>

                }

                return <div
                class='mx-1 cursor-pointer border-solid border-gray-600 border-2 text-xs w-5 h-50 text-center'

                >
                    <span
                        onClick={() => {
                            setCurrentPage(item)
                            _onClick(item)
                        }}
                    >
                        {item + 1}
                    </span>
                </div>

            })}
        </div>
    );
}

export default NavigatePage;