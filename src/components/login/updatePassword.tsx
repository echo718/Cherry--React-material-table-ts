import React from 'react';
//import './custom-button.style.scss'

const UpdatePassword = ({children,...otherProps}:any) => {
    return (
        <button
        {...otherProps}
         className='custom-button'>
            {children}
        </button>
    )
}
export default UpdatePassword