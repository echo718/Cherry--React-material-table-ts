import React from 'react';


const RememberMe = function (props): JSX.Element  {
    return (
        <div >
            <input type="checkbox" style={{ margin: "8px" }} className="checkRemember" onClick={() => props.handelRemember} />
            <span>Remember me</span>
           
        </div>
    );
}

export default RememberMe;



