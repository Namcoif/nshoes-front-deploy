import React from 'react';

function ButtonIcon(props) {
    const { label, _onClick } = props
    return (
        <div>
            {_onClick
                ?
                <button
                    onClick={_onClick}
                    className='
                        bg-gradient-to-br from-red-vio to-vio-red text-white
                        rounded-circle
                        w-6 h-6 min-w-min'
                >
                    {label}
                </button>
                :
                <button
                    className='
                        bg-gradient-to-br from-red-vio to-vio-red text-white
                        rounded-circle 
                        w-6 h-6 min-w-min'>
                    {label}
                </button>
            }
        </div>
    );
}

export default ButtonIcon;