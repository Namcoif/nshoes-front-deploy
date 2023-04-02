import React from 'react';

function ButtonIcon(props) {
    const { label, _onClick } = props
    return (
        <div>
            {_onClick
                ?
                <button
                    onClick={_onClick}
                    class='
                        bg-gradient-to-br from-red-vio to-vio-red text-white
                        rounded-circle
                        w-6 h-6 min-w-min'
                >
                    {label}
                </button>
                :
                <button
                    class='
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