import React from 'react';
import './CustomButton.css'
function CustomButton(props) {
    const { label, _onClick, refButton } = props;
    return (
        <div className=''>
            {
                _onClick ?
                    <button
                        ref={refButton}
                        onClick={_onClick}
                        className='custom-btn btn-1'

                    >
                        <span>
                            {label}
                        </span>
                    </button>

                    :
                    <button
                        ref={refButton}
                        className='custom-btn btn-1'

                    // className='
                    // bg-gradient-to-br from-red-vio to-vio-red

                    // py-1

                    // uppercase
                    // text-xs
                    // text-white
                    // rounded-sm

                    // w-full
                    // sm:px-1
                    // lg:px-3
                    // lg:py-1

                    // focus:outline-0'
                    >
                        <span>
                            {label}
                        </span>
                    </button>}
        </div >
    );
}

export default CustomButton;