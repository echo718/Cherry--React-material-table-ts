import React from 'react';

const LoginButton = ({children,...otherProps}:any) => {
    return (
        <button
        {...otherProps}
         className='btn btn-primary'>
            {children}
        </button>
    )
}
export default LoginButton