// import React from 'react'

// class Logoutcopy extends React.Component {
//     setCookie = (key, value, day) => {
//         let expires = day * 86400 * 1000  // 时间转化成 ms
//         let date = new Date(+ new Date() + expires) // 当前时间加上要存储的时间
//         document.cookie = `${key}=${value};expires=${date.toUTCString()}`
//     }

//     logout = () => {
//          this.setCookie('login', '', -1)
//          alert(" Log out successful.")
//     }
//     render() { 
//         return ( 
//            <div>
//                <h3>You already login. Welcome.</h3>
//                <button onClick={this.logout} >Log out</button>
//            </div>

//          );
//     }
// }
 
// export default Logoutcopy;

import React from 'react'

const logoutcopy = () => {
    return (
        <div>
            
        </div>
    )
}

export default logoutcopy


