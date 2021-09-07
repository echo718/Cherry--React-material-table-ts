
import { Route, Redirect } from 'react-router-dom';
import ProductManager from '../productmanager/ProductManager';

var expires;

// 这个组件将根据登录的情况, 返回一个路由
const PrivateRoute = ({component: Component, ...props}) => {
    
  
    // 解构赋值 将 props 里面的 component 赋值给 Component
    return <Route {...props} render={(p) => {
        const token =   window.localStorage.getItem("Token")
      
        if (token ){ // 如果登录了, 返回正确的路由
           
            const temp = document.cookie.split(";").filter( item => item.includes( window.localStorage.username))
            if(temp.length !== 0){
                 expires = temp[temp.length-1].split("*")[1].split("=")[1]
            }else{
                expires=''
            }
            let date = new Date()
         
            if(expires >  date.toUTCString() ){
                // if(date ){
                return <ProductManager />      
            }else{
                alert("Please Login first!")
                return <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: p.location.pathname
                    }
                }}/>
            }                  
        } else { // 没有登录就重定向至登录页面
            alert("Please login first!")
            return <Redirect to={{
                pathname: '/login',
                state: {
                    from: p.location.pathname
                }
            }}/>
        }
    }}/>
}
export default PrivateRoute
