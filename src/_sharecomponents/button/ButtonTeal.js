import React from 'react';
function ButtonTeal(props) {
    const { label, _onClick, refButton } = props;
    return (
        <div >
            {
                _onClick ?
                    <button
                        ref={refButton}
                        onClick={_onClick}
                        className='custom-btn btn-1 btn-2'

                    >
                        <span>
                            {label}
                        </span>
                    </button>

                    :
                    <button
                        ref={refButton}
                        className='custom-btn btn-1 btn-2'
                    >
                        <span>
                            {label}
                        </span>
                    </button>}
        </div >
    );
}

export default ButtonTeal;