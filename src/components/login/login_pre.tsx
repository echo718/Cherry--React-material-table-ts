// import React from 'react'
// import FormInput from './forminput';
// import LoginButton from './loginbutton';
// import RegisterButton from './registerbutton';
// import RememberMe from './rememberme';
// import LogoutTest from './logouttest';
// import axios from 'axios';
// import Nav from "../nav";
// //import './sign-in.style.scss'

// export default class Login_pre extends React.Component<any, any>{
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             usernameRegister: '',
//             passwordRegister: '',
//             type: 0,
//             discountRate: 0,
//             fistname: '',
//             lastname: '',
//             companyName: '',
//             mobileNumber: '',
//             email: '',
//             apiData: [],
//             index: 0,
//             isLogin: document.cookie.includes('login=true'),
//             checked: false
//         }
//         this.handleInput = this.handleInput.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }



//     getApiUsersData = () => {
//         var api = "http://206.189.39.185:5031/api/User"
//         axios.get(api)
//             .then(res => {
//                 this.setState({
//                     apiData: res.data.data
//                 })
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }



//     componentDidMount() {
//         this.getApiUsersData();
//     }

//     handelRemember = (e: React.FormEvent) => {
//         // e.preventDefault();

//         let checkboxes: any = document.getElementsByClassName("checkRemember")
//         console.log(checkboxes)
//         if (checkboxes.checked) {
//             this.setState({ checked: true })
//         }
//         console.log(this.state.checked)

//     }

//     handleInput(e: React.FormEvent) {
//         const { value = '', name = '' } = e.target as any;
//         this.setState({
//             [name]: value
//         })
//     }

//     jumpBack = () => {
//         const { location } = this.props

//         const from = location.state && location.state.from

//         //  const article = location.state && location.state.article
//         this.props.history.push({
//             pathname: from,
//             state: {
//                 // article
//             }
//         })
//     }

//     setCookie = (key, value, day, username) => {

//         //   let expires = day * 86400 * 1000  // 时间转化成 ms
//         let expires = day
//         let date = new Date(+ new Date() + expires) // 当前时间加上要存储的时间
//         document.cookie = `${key}=${value}expires=${date.toUTCString()}username=${username}`

//         console.log("login", document.cookie)
//     }
//     //click login button
//     handleSubmit(e: React.FormEvent) {
//         e.preventDefault();

//         //用户验证
//         const apiData = this.state.apiData

//         const validUser = apiData.filter(item => item.userName === this.state.username && item.password === this.state.password)

//         //判断是否 remember me 
//         const checkboxes: any = document.getElementsByClassName("checkRemember")

//         validUser.length === 0 ? alert("not exist.") : alert("login succhessful.") 

//         if (validUser.length !== 0) {
//             // console.log(this.state.checked)

//             // 设置cookie之后跳转回来时的页面

//             this.setCookie('login', true, checkboxes.checked ? 6000000000 : 30000, this.state.username)

//             this.jumpBack()
//             window.location.reload()

//         } else {
//             // 设置时间为负数, 取消设置的 cookie
//             this.setCookie('login', '', -1, '')
//         }
//     }
//     //调用register api
//     getRegisterApi = (newData) => {
//         //  var params = new URLSearchParams();
        
//         axios({
//             method: "post",
//             url: "http://206.189.39.185:5031/api/User/UserRegister",
//             headers: {
//                 'Content-type': 'application/json;charset=UTF-8'
//             },
//             data: JSON.stringify(newData),
//         }).then((res) => {
//             alert(" Created successfully");
//             this.setState({ isLogin: true })
//             this.setCookie('login', true, 60000000, newData.userName)
//             this.jumpBackHome()
//         })
//             .catch((error) => {
//                 alert(" Created Unsuccessfully. Please input valid information.");
//                 this.setCookie('login', '', -1, '')
//                 return error;
//             })
//     }

//     jumpBackHome = () => {
//         const { location } = this.props

//         const from = location.state && location.state.from

//         //console.log(from, this.state.isLogin)
//         //  const article = location.state && location.state.article
//         this.props.history.push({

//             pathname: from,
//             state: {
//                 // article
//             }
//         })


//     }

//     handleRegisterInput = (e: React.FormEvent) => {
//         const { value = '', name = '' } = e.target as any;
//         this.setState({
//             [name]: value
//         })
//     }

//     handleRegisterSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         let newData = {
//             password: this.state.passwordRegister,
//             userName: this.state.usernameRegister,
//             type: parseInt(this.state.type),
//             discountRate: parseInt(this.state.discountRate),
//             firstName: this.state.firstname,
//             lastName: this.state.lastname,
//             companyName: this.state.companyName,
//             mobileNumber: this.state.mobileNumber,
//             email: this.state.email
//         }
//         this.getRegisterApi(newData)
//     }

//     render() {
//         const { username, password, usernameRegister, passwordRegister, firstname, lastname, email, mobileNumber, companyName, type, discountRate, isLogin } = this.state;


//         return (
//             <React.Fragment>
//                 <Nav />
//                 {
//                     isLogin ?
//                         <LogoutTest />
//                         :
//                         <div className=" row mt-1" >
//                             <div className="col-2"></div>
//                             <div className="col-4 ">
//                                 <h2>Already have an account?</h2>
//                                 <span>Sign in with your username and passowrd</span>

//                                 <form onSubmit={this.handleSubmit}>
//                                     <FormInput
//                                         type="string"
//                                         name='username'
//                                         value={username}
//                                         labelName='username'
//                                         required
//                                         onChange={this.handleInput}
//                                     />
//                                     <FormInput
//                                         type="password"
//                                         name='password'
//                                         labelName='Password'
//                                         value={password}
//                                         onChange={this.handleInput}
//                                         required
//                                     />

//                                     <RememberMe handelRemember={this.handelRemember} />

//                                     <LoginButton type='submit' >Sign in</LoginButton>
//                                 </form>
//                             </div>

//                             <div className="col-4  ">
//                                 <h2>Need create an account?</h2>
//                                 <span>Register now.</span>

//                                 <form onSubmit={this.handleRegisterSubmit}>
//                                     <FormInput
//                                         type="string"
//                                         name='usernameRegister'
//                                         value={usernameRegister}
//                                         labelName='Username'
//                                         required
//                                         onChange={this.handleRegisterInput}
//                                     />
//                                     <FormInput
//                                         type="password"
//                                         name='passwordRegister'
//                                         labelName='Password'
//                                         value={passwordRegister}
//                                         onChange={this.handleRegisterInput}
//                                         required
//                                     />
//                                     <FormInput
//                                         type="number"
//                                         name='type'
//                                         labelName='type'
//                                         value={type}
//                                         onChange={this.handleRegisterInput}
//                                         required={false}
//                                     />
//                                     <FormInput
//                                         type="number"
//                                         name='discountRate'
//                                         labelName='discountRate'
//                                         value={discountRate}
//                                         onChange={this.handleRegisterInput}
//                                         required={false}
//                                     />
//                                     <FormInput
//                                         type="string"
//                                         name='firstname'
//                                         labelName='FirstName'
//                                         value={firstname}
//                                         onChange={this.handleRegisterInput}
//                                         required={false}
//                                     />
//                                     <FormInput
//                                         type="string"
//                                         name='lastname'
//                                         labelName='LastName'
//                                         value={lastname}
//                                         onChange={this.handleRegisterInput}
//                                         required={false}
//                                     />


//                                     <FormInput
//                                         type="string"
//                                         name='companyName'
//                                         labelName='companyName'
//                                         value={companyName}
//                                         onChange={this.handleRegisterInput}
//                                         required={false}
//                                     />
//                                     <FormInput
//                                         type="string"
//                                         name='mobileNumber'
//                                         labelName='mobileNumber'
//                                         value={mobileNumber}
//                                         onChange={this.handleRegisterInput}
//                                         required={false}
//                                     />
//                                     <FormInput
//                                         type="email"
//                                         name='email'
//                                         labelName='Email'
//                                         value={email}
//                                         onChange={this.handleRegisterInput}
//                                         required={false}
//                                     />

//                                     <RememberMe handelRemember={this.handelRemember} />

//                                     <RegisterButton type='submit' >Create</RegisterButton>
//                                 </form>
//                             </div>

//                         </div>
//                 }

//             </React.Fragment>

//         )
//     }
// }
import React from 'react'

const login_pre = () => {
    return (
        <div>
            
        </div>
    )
}

export default login_pre
