import React from 'react';
// import './CustomButton.css'
function CustomButton(props) {
    const { label, _onClick, refButton } = props;
    return (
        <div className='custom-button'>
            {
                _onClick ?
                    <button
                        ref={refButton}
                        onClick={_onClick}
                        class='
                        bg-gradient-to-br from-red-vio to-vio-red
                        
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
                        bg-gradient-to-br from-red-vio to-vio-red
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

export default CustomButton;