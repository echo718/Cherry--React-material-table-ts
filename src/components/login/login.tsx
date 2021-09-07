import React from 'react'
import FormInput from './forminput';
import LoginButton from './loginbutton';
import RegisterButton from './registerbutton';
import LogoutTest from './logouttest';
import axios from 'axios';
import Nav from "../nav";
import loginbg from "../../assets/loginbg.jpg";

export default class Login extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameRegister: '',
            passwordRegister: '',
            type: 0,
            discountRate: 0,
            fistname: '',
            lastname: '',
            companyName: '',
            mobileNumber: '',
            email: '',
            checkedSignin: false,
            checkedCreate:false,
            loginTest:false,
            isLogin: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handelRemember = () => {
        let checkSignin: any = document.getElementById("checkRememberSignin")
        let checkCreate: any = document.getElementById("checkRememberCreate")
        if (checkSignin.checked || checkCreate.checked) {
           return true
        }else{
            return false
        }     
    }

    handleInput(e: React.FormEvent) {
        const { value = '', name = '' } = e.target as any;
        this.setState({
            [name]: value
        })
    }

    jumpBack = () => {
        const { location } = this.props
       
        const from = location.state && location.state.from
        //  const article = location.state && location.state.article
        this.props.history.push({
            pathname: from,
            state: {
                // article
            }
        })
    }

    setCookie = (key, value, day, username) => {
        //let expires = day * 86400 * 1000  // 时间转化成 ms
        let expires = day
        let date = new Date(+ new Date() + expires) // 当前时间加上要存储的时间
        document.cookie = `${key}*expires=${date.toUTCString()}*username=${username}`
    }

    //token Authorization
    setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = token
        } else {
            axios.defaults.headers.common["not Authorization"] = token
        }
    }

    //login part
    loginUser = (userData) => {
        axios.post("http://206.189.39.185:5031/api/User/UserLogin", userData)
            .then(res => {
               
                //set token
                const { token } = res.data.data
                localStorage.setItem("Token", token)
                localStorage.setItem("username", userData.username)
                this.setAuthToken(token)
                //判断点击 remember me 
               const isRemember = this.handelRemember()
                // 设置跳转回来时的页面
                this.setCookie(token, '', isRemember ? 1000000 : 300000, this.state.username)
                alert("Login successful.")
                this.jumpBack()
              
            })
            .catch(error => {
                alert("Please check your Username and Password")
                return error
            })
    }
    //after clicking login button
    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        };
        this.loginUser(newUser)
    }

    //调用register api
    getRegisterApi = (newData) => {
        //  var params = new URLSearchParams();
        axios({
            method: "post",
            url: "http://206.189.39.185:5031/api/User/UserRegister",
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify(newData),
        }).then((res) => {
            const token  = "nO4BsHRrPUORTsf0+DOdUA=="
            localStorage.setItem("Token", token)
            localStorage.setItem("username", this.state.usernameRegister)
            this.setAuthToken(token)
            //判断点击 remember me 
            const isRemember = this.handelRemember()
            // 设置跳转回来时的页面
            this.setCookie(token, '', isRemember ? 1000000 : 300000, this.state.usernameRegister)
            alert(" Created successfully");
            this.jumpBack()
        })
            .catch((error) => {
                alert(" Created Unsuccessfully. Please input valid information.");
               // this.setCookie('token', '', -1, '')
                return error;
            })
    }

    // jumpBackHome = () => {
    //     const { location } = this.props
    //     const from = location.state && location.state.from
    //     this.props.history.push({
    //         pathname: from,
    //         state: {
    //             // article
    //         }
    //     })
    // }

    handleRegisterInput = (e: React.FormEvent) => {
        const { value = '', name = '' } = e.target as any;
        this.setState({
            [name]: value
        })
    }

    handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newData = {
            password: this.state.passwordRegister,
            userName: this.state.usernameRegister,
            type: parseInt(this.state.type),
            discountRate: parseInt(this.state.discountRate),
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            companyName: this.state.companyName,
            mobileNumber: this.state.mobileNumber,
            email: this.state.email
        }
        this.getRegisterApi(newData)
        
    }
    //login page image style
    imgStyle = { width: "70%", margin: "10px 15%" }
    
    //渲染时判断是否login, 并且在expire 日期内
    isLogin = () => {
        if (window.localStorage.getItem("Token")) {
            const temp = document.cookie.split(";").filter(item => item.includes(window.localStorage.username))
            if(temp.length !== 0){
               var expires = temp[temp.length-1].split("*")[1].split("=")[1]
           }else{
               expires=''
           }
            let date = new Date()
            if ( expires > date.toUTCString()) {
               return true
            } else {
                return false
            }
        }else{
            return false
        }

    }

    logout = () => {
        localStorage.setItem("Token", "")
        alert(" Log out successful.")
        this.isLogin()
        this.jumpBack()
    }

    render() {
        const { username, password, usernameRegister, passwordRegister, firstname, lastname, email, mobileNumber, companyName, type, discountRate } = this.state;

        return (
            <React.Fragment>
                <Nav />
                {
                   this.isLogin()
                        ?
                        <LogoutTest logout={this.logout}/>
                        :
                        <div>
                            <img src={loginbg} alt="" style={this.imgStyle} />
                            <div className=" row mt-1" >

                                <div className="col-2"></div>
                                <div className="col-4 ">
                                    <h2>Already have an account?</h2>
                                    <span>Sign in with your username and password</span>

                                    <form onSubmit={this.handleSubmit}>
                                        <FormInput
                                            type="string"
                                            name='username'
                                            value={username}
                                            labelName='Username'
                                            required
                                            onChange={this.handleInput}
                                        />
                                        <FormInput
                                            type="password"
                                            name='password'
                                            labelName='Password'
                                            value={password}
                                            onChange={this.handleInput}
                                            required
                                        />

                                        <div >
                                            <input type="checkbox" style={{ margin: "8px" }} id="checkRememberSignin"  />
                                            <span>Remember me</span>
                                        </div>

                                        <LoginButton type='submit' >Sign in</LoginButton>
                                    </form>
                                </div>

                                <div className="col-6 ">
                                    <h2>Need create an account?</h2>
                                    <span>Register now.</span>

                                    <form onSubmit={this.handleRegisterSubmit}>
                                        <FormInput
                                            type="string"
                                            name='usernameRegister'
                                            value={usernameRegister}
                                            labelName='Username'
                                            required
                                            onChange={this.handleRegisterInput}
                                        />
                                        <FormInput
                                            type="password"
                                            name='passwordRegister'
                                            labelName='Password'
                                            value={passwordRegister}
                                            onChange={this.handleRegisterInput}
                                            required
                                        />
                                        <FormInput
                                            type="number"
                                            name='type'
                                            labelName='Type'
                                            value={type}
                                            onChange={this.handleRegisterInput}
                                            required={false}
                                        />
                                        <FormInput
                                            type="number"
                                            name='discountRate'
                                            labelName='Discount Rate'
                                            value={discountRate}
                                            onChange={this.handleRegisterInput}
                                            required={false}
                                        />
                                        <FormInput
                                            type="string"
                                            name='firstname'
                                            labelName='First Name'
                                            value={firstname || ''}
                                            onChange={this.handleRegisterInput}
                                            required={false}
                                        />
                                        <FormInput
                                            type="string"
                                            name='lastname'
                                            labelName='Last Name'
                                            value={lastname}
                                            onChange={this.handleRegisterInput}
                                            required={false}
                                        />


                                        <FormInput
                                            type="string"
                                            name='companyName'
                                            labelName='Company Name'
                                            value={companyName}
                                            onChange={this.handleRegisterInput}
                                            required={false}
                                        />
                                        <FormInput
                                            type="string"
                                            name='mobileNumber'
                                            labelName='Mobile Number'
                                            value={mobileNumber}
                                            onChange={this.handleRegisterInput}
                                            required={false}
                                        />
                                        <FormInput
                                            type="email"
                                            name='email'
                                            labelName='Email'
                                            value={email}
                                            onChange={this.handleRegisterInput}
                                            required={false}
                                        />

                                        <div >
                                            <input type="checkbox" style={{ margin: "8px" }} id="checkRememberCreate"  />
                                            <span>Remember me</span>
                                        </div>

                                        <RegisterButton type='submit' >Submit</RegisterButton>
                                    </form>
                                </div>

                            </div>
                        </div>

                }
            </React.Fragment>
        )
    }
}