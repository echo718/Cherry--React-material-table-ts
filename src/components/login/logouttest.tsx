import React from 'react';
import FormInput from './forminput';
import LoginButton from './loginbutton';
import axios from 'axios';
import update from "../../assets/update.jpg";
import informationupdate from "../../assets/informationupdate.jpg";
import deleteaccount from "../../assets/deleteaccount.jpg";
import logout from "../../assets/logout.jpg";
import 'bootstrap/dist/css/bootstrap.css';

class LogoutTest extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            upUsername: '',
            upNewPassword: '',
            upOldPassword: '',
            upMoreUsername: '',
            upMorePassword: '',
            upMoreType: '',
            upMoreDiscountRate: '',
            upMoreFirstname: '',
            upMoreLastname: '',
            upMoreCompanyName: '',
            upMoreMobileNumber: '',
            upMoreEmail: '',
            userId: '',
            apiData: [],
            isDelDisplay: true,
            isPassDisplay: true,
            isMoreDisplay: true
        }
    }
  

    getApiUsersData = () => {
        var api = "http://206.189.39.185:5031/api/User"
        axios.get(api)
            .then(res => {
                this.setState({
                    apiData: res.data.data
                })
            })
            .catch(err => {
                console.error(err);
            })
    }

    componentDidMount() {
        this.getApiUsersData();
    }

    handleInput = (e: React.FormEvent) => {
        const { value = '', name = '' } = e.target as any;
        this.setState({
            [name]: value
        })
    }

    setCookie = (key, value, day) => {
        let expires = day * 86400 * 1000  // 时间转化成 ms
        let date = new Date(+ new Date() + expires) // 当前时间加上要存储的时间
        document.cookie = `${key}=${value};expires=${date.toUTCString()}`
    }

    //delete user API
    handelDelete = (userId) => {
        axios.delete("http://206.189.39.185:5031/api/User/" + userId)
            .then(response => {
                if (response.status === 200) {
                    alert("Service delete Successfully");
                    localStorage.setItem("Token", "")
                   // setTimeout(() => { window.location.reload() }, 2000)
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    //调用change password API
    handelUpdatePassword = async (userId, upNewPassword) => {
        const newData = { userId: userId, password: upNewPassword }

        axios.put("http://206.189.39.185:5031/api/User/UserPasswordUpdate", newData)
            .then(response => {
                if (response.status === 200) {
                    alert("Service Updated Successfully");
                }
                else {
                    alert("Service Updated Unsuccessfully");
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    //click change password button
    handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const upAiData: any = this.state.apiData
        const upValidUser = upAiData.filter(item => item.userName === this.state.upUsername && item.password === this.state.upOldPassword)
        this.setState({ userId: upValidUser[0].userId })
        if (this.state.userId) {
            this.handelUpdatePassword(this.state.userId, this.state.upNewPassword)
        }
    }
    //调用 用户信息修改的API
    handelUpMore = async (userId, upMorePassword, upMoreUsername, upMoreType, upMoreDiscountRate, upMoreFirstName, upMoreLastname, upMoreCompanyName, upMoreMobileNumber, upMoreEmail) => {
        //把填入的值部分更改类型
        const newMoreData = { userId: userId, password: upMorePassword, userName: upMoreUsername, upMoreType: Number(upMoreType), discountRate: Number(upMoreDiscountRate), firstName: upMoreFirstName, lastName: upMoreLastname, companyName: upMoreCompanyName, mobileNumber: upMoreMobileNumber, email: upMoreEmail }

        axios.put("http://206.189.39.185:5031/api/User/UserUpdate", newMoreData)
            .then(response => {
                if (response.status === 200) {
                    alert(" Updated Successfully");
                }
                else {
                    alert(" Updated Unsuccessfully");
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    //account information update card 
    handleUpMoreSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let upMoreAiData: any = this.state.apiData
        let upMoreValidUser = upMoreAiData.filter(item => item.userName === this.state.upMoreUsername && item.password === this.state.upMorePassword)

        if (upMoreValidUser) {
            this.handelUpMore(upMoreValidUser[0].userId, this.state.upMorePassword, this.state.upMoreUsername, this.state.upMoreType, this.state.upMoreDiscountRate, this.state.upMoreFirstname, this.state.upMoreLastname, this.state.upMoreCompanyName, this.state.upMoreMobileNumber, this.state.upMoreEmail)
        }
    }

    //deleteAccount handel 
    handelDeleteSubmit = () => {

        const delUsername = document.cookie.substring(document.cookie.lastIndexOf("=") + 1)

        // this.getApiUsersData()
        const apiData: any = this.state.apiData
        const validUser = apiData.filter(item => item.userName === delUsername)

        if (validUser.length !== 0) {
            this.setState({ userId: validUser[0].userId })
            this.handelDelete(validUser[0].userId)
            //this.setCookie('login', '', -1)
            localStorage.setItem("Token", "")
        } else {
            alert("User not exist.")
        }
    }

    //handelPasword Show 
    handelPaswordShow = () => {
        this.setState({ isPassDisplay: !this.state.isPassDisplay })

        const slidesPassword = document.getElementsByClassName("updatePassword")
        for (let i = 0; i < slidesPassword.length; i++) {
            const slide = slidesPassword[i];
            if (slide instanceof HTMLElement) {
                // slide is a HTMLElement
                slide.style.display = this.state.isPassDisplay ? "block" : "none"
            }
        }
    }

    //handelMore Show
    handelMoreShow = () => {
        this.setState({ isMoreDisplay: !this.state.isMoreDisplay })
        const slidesMore = document.getElementsByClassName("updateMore")
        for (let i = 0; i < slidesMore.length; i++) {
            const slide = slidesMore[i];
            if (slide instanceof HTMLElement) {
                // slide is a HTMLElement
                slide.style.display = this.state.isMoreDisplay ? "block" : "none"
            }
        }
    }

    //All btns style
    btnStyle = { height: "60px", width: "100%" }

    render() {
        return (
            <div className="container">
                <div className="row">

                    {/* delete account card */}
                    <div className=" col card m-5 align-items-center" >
                        <img src={deleteaccount} className="card-img-top" alt="..." style={{ height: "350px" }} />
                        <div className="card-body" style={{ width: "100%" }}>
                            <button onClick={this.handelDeleteSubmit} className="btn btn-primary " style={this.btnStyle}>Delete account</button>
                        </div>
                    </div>

                    {/* update password card */}
                    <div className=" col card m-5 align-items-center" >
                        <img src={update} className="card-img-top" alt="..." style={{ height: "350px" }} />
                        <div className="card-body" style={{ width: "100%" }}>
                            <button onClick={this.handelPaswordShow} className="btn btn-primary" style={this.btnStyle} >Update Password</button>

                            <form onSubmit={this.handleUpdateSubmit} className="updatePassword" style={{ display: 'none' }}>
                                <FormInput
                                    type="string"
                                    name='upUsername'
                                    labelName='Username'
                                    value={this.state.upUsername}
                                    required
                                    onChange={this.handleInput}
                                />
                                <FormInput
                                    type="password"
                                    name='upOldPassword'
                                    labelName='Old Password'
                                    value={this.state.upOldPassword}
                                    onChange={this.handleInput}
                                    required
                                />
                                <FormInput
                                    type="password"
                                    name='upNewPassword'
                                    labelName='New Password'
                                    value={this.state.upNewPassword}
                                    onChange={this.handleInput}
                                    required
                                />

                                <LoginButton type='submit' >Update </LoginButton>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* account information update */}
                    <div className=" col card m-5 align-items-center" >
                        <img src={informationupdate} className="card-img-top" alt="..." style={{ height: "350px" }} />
                        <div className="card-body" style={{ width: "100%" }}>
                            <button onClick={this.handelMoreShow} className="btn btn-primary" style={this.btnStyle}>Account Information Update</button>

                            <form onSubmit={this.handleUpMoreSubmit} className="updateMore " style={{ display: 'none' }}>
                                <FormInput
                                    type="string"
                                    name='upMoreUsername'
                                    value={this.state.upMoreUsername}
                                    labelName='Username'
                                    required
                                    onChange={this.handleInput}
                                />
                                <FormInput
                                    type="password"
                                    name='upMorePassword'
                                    labelName='Password'
                                    value={this.state.upMorePassword}
                                    onChange={this.handleInput}
                                    required
                                />
                                <FormInput
                                    type="number"
                                    name='upMoreType'
                                    labelName='upMoreType'
                                    value={this.state.upMoreType}
                                    onChange={this.handleInput}
                                    required={false}
                                />
                                <FormInput
                                    type="number"
                                    name='upMoreDiscountRate'
                                    labelName='discountRate'
                                    value={this.state.upMoreDiscountRate}
                                    onChange={this.handleInput}
                                    required={false}
                                />
                                <FormInput
                                    type="string"
                                    name='upMoreFirstname'
                                    labelName='FirstName'
                                    value={this.state.upMoreFirstname}
                                    onChange={this.handleInput}
                                    required={false}
                                />
                                <FormInput
                                    type="string"
                                    name='upMoreLastname'
                                    labelName='LastName'
                                    value={this.state.upMoreLastname}
                                    onChange={this.handleInput}
                                    required={false}
                                />


                                <FormInput
                                    type="string"
                                    name='upMoreCompanyName'
                                    labelName='companyName'
                                    value={this.state.upMoreCompanyName}
                                    onChange={this.handleInput}
                                    required={false}
                                />
                                <FormInput
                                    type="string"
                                    name='upMoreMobileNumber'
                                    labelName='mobileNumber'
                                    value={this.state.upMoreMobileNumber}
                                    onChange={this.handleInput}
                                    required={false}
                                />
                                <FormInput
                                    type="email"
                                    name='upMoreEmail'
                                    labelName='Email'
                                    value={this.state.upMoreEmail}
                                    onChange={this.handleInput}
                                    required={false}
                                />
                                <LoginButton type='submit' >Update </LoginButton>
                            </form>
                        </div>
                    </div>
                    {/* log out */}
                    <div className="col card m-5 align-items-center" >
                        <img src={logout} className="card-img-top" alt="..." style={{ height: "350px" }} />
                        <button onClick={this.props.logout} className="btn btn-warning" style={this.btnStyle} >Log out</button>
                    </div>

                </div>

            </div>


        );
    }
}

export default LogoutTest;
