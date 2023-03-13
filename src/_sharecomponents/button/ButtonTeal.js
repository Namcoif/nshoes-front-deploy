import React from 'react';
function ButtonTeal(props) {
    const { label, onclick, refButton } = props;
    return (
        <div >
            {
                onclick ?
                    <button
                        ref={refButton}
                        onClick={onclick}
                        class='
                                bg-gradient-to-br from-teal-400 to-red-400
                                uppercase
                                text-xs
                                text-white
                                rounded-sm

                                w-full
                                sm:px-1
                                lg:px-3
                                lg:py-1
                                
                                focus:outline-0'
                    >
                        {label}
                    </button>

                    :
                    <button
                        ref={refButton}
                        class='
                                bg-gradient-to-br from-teal-400 to-red-400
                                uppercase
                                text-xs
                                text-white
                                rounded-sm 
                                
                                w-full
                                sm:px-1
                                lg:px-3
                                lg:py-1
                                
                                focus:outline-0'
                    >
                        {label}
                    </button>}
        </div >
    );
}

export default ButtonTeal;