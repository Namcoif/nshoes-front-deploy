import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
// import './CustomInput.css'
const CustomSearch = (props) => {
    const { placeholder, _getInputValue } = props

    const [value, setValue] = useState('');

    const [onFocus, setOnFocus] = useState();


    const _handleChange = (e) => {
        setValue(e.target.value);
    }

    const _onFocus = (e) => {
        setOnFocus(!onFocus)
    }

    const _onBlur = (e) => {
        setOnFocus(!onFocus)
    }

    useEffect(() => {
        _getInputValue(value);
    }, [value])

    return (
        <div
            className='custom-input'
            class='
                        flex
                        flex-row
                        items-center
                        border-2 border-solid border-red-vio
                        rounded
                        bg-white
                        flex-1
                        sm:w-48
                '
        >

            <input
                // className={onFocus ? 'input-item on-focus' : 'input-item'}
                class="
                    form-control
                    block
                    bg-white
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    bg-inherit bg-clip-padding
                    rounded
                    transition
                    ease-in-out
                    h-full
                    m-0
                    focus:text-black 
                    focus:bg-white 
                    focus:border-blue-600 
                    focus:outline-none
                    
                "

                type="text"
                placeholder={placeholder}
                value={value}
                onChange={_handleChange}
                onFocus={_onFocus}
                onBlur={_onBlur}
            />

            <div
                class='      
                    bg-red-vio'
            >
                <CiSearch
                    class="
                            h-full
                            w-8
                            text-white
                        "

                // onClick={ }
                />
            </div>

        </div>
    );
}

export default CustomSearch;