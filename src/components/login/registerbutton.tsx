import React from 'react';
//import './custom-button.style.scss'

const RegisterButton = ({children,...otherProps}:any) => {
    return (
        <button
        {...otherProps}
         className='btn btn-success'>
            {children}
        </button>
    )
}
export default RegisterButton