import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useParams } from 'react-router-dom';
// import './CustomInput.css'
const CustomSearch = (props) => {
    const { placeholder, name, _getInputValue, _onClick, refSubmit } = props

    const [value, setValue] = useState('');

    const [onFocus, setOnFocus] = useState();

    const { productName } = useParams();

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
        _getInputValue(name, value);
    }, [value])

    useEffect(() => {
        const _changeSearch = () => {
            if (productName !== '') {
                setValue(productName);
            }
        }
        _changeSearch()
    }, [productName])



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
                    h-full
                    m-0
                    focus:outline-none
                    
                "

                type="text"
                placeholder={placeholder}
                value={value}
                onChange={_handleChange}
                onFocus={_onFocus}
                onBlur={_onBlur}
            />


            <button
                ref={refSubmit}
                onClick={_onClick}
                class=' w-min bg-red-vio focus:outline-none'>
                <CiSearch
                    class="
                            h-full
                            w-8
                            text-white
                            cursor-pointer
                        "
                />
            </button>
        </div>
    );
}

export default CustomSearch;