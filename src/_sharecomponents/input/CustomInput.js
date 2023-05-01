import React, { useEffect, useState } from 'react';

function CustomInput(props) {


    const { refInput, name, type, Icon, Icon2, Icon3, placeholder, _getInputValue, valueStart = '', disabled = false } = props


    const [value, setValue] = useState(valueStart);

    const [onFocus, setOnFocus] = useState();

    const [isChangeType, setIsChangeType] = useState(false)
    const _changeTypeInput = () => {
        setIsChangeType(!isChangeType)

    }
    console.log(valueStart);

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
        setValue(valueStart);
    }, [])

    return (
        <div
            className='
                        flex
                        flex-row
                        items-center
                        border-b-2 border-solid border-red-vio
                        bg-white
                        my-1
                        
                        h-full
                        w-full
                '
        >
            {Icon != null ? <Icon /> : null}
            <input
                className="
                    form-control
                    block
                    bg-white
                    w-full
                    px-1
                    py-1.5
                    text-base
                    font-normal
                    bg-inherit bg-clip-padding
                    rounded
                    transition
                    h-full
                
                    focus:text-black     
                    forcus: outline-none
                "

                type={isChangeType ? 'text' : type}
                placeholder={placeholder}
                value={value}
                onChange={_handleChange}
                onFocus={_onFocus}
                onBlur={_onBlur}
                ref={refInput}
                required
                disabled={disabled}
            />
            {
                Icon2 && Icon3 != null
                    ? (isChangeType
                        ?
                        <div onClick={_changeTypeInput}>
                            <Icon2 />
                        </div>
                        :
                        <div onClick={_changeTypeInput}>
                            <Icon3 />
                        </div>
                    )
                    : null
            }


        </div>
    );
}

export default CustomInput;