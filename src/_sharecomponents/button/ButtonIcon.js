import React from 'react';

function ButtonIcon(props) {
    const { label, onclick } = props
    return (
        <div>
            {onclick
                ?
                <button
                    onClick={onclick}
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