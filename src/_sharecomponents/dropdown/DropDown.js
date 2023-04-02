import React, { useState } from 'react';

function DropDown(props) {

    const { Drop, DropContent } = props

    const [dropDown, setDropDown] = useState(false)

    const _trueDropDown = () => {
        setDropDown(true)
    }
    const _falseDropDown = () => {
        setDropDown(false)
    }
    return (
        <div class=' '>
            <div
                class='
                    relative'
                onMouseOver={_trueDropDown}
                onMouseOut={_falseDropDown}
            >
                <Drop />

                {
                    dropDown
                        ?
                        <div class='absolute -right-24 w-max'>

                            <div
                                class='
                                    relative'
                                onMouseOver={_trueDropDown}
                                onMouseOut={_falseDropDown}
                                onClick={_falseDropDown}>

                                {/* <div class=' p-3 w-4 h-4 rotate-45 bg-gray-500 -top-2 left-14 absolute -z-10'>

                                </div> */}

                                <DropContent />

                            </div>
                        </div>
                        : null
                }
            </div>


        </div>
    );
}

export default DropDown;