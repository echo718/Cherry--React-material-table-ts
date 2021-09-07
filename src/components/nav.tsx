
import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import background from "../assets/background.png";

class Nav extends React.Component {


    getCookie = () => {
        //  var name = cname + "=";
        var ca = document.cookie
        console.log("nav", ca)
        // for (var i = 0; i < ca.length; i++) {
        //     var c = ca[i].trim();
        //     if (c.indexOf(username) === 0) return c.substring(username.length);
        // }
        return test;
    }

    navStyle = { backgroundSize: '100% 100%', backgroundImage: `url(${background})`, height: "80px", width: "100%",fontFamily: "Cursive" }

    logo = { color: "white", width: "300px", height: "65px", paddingLeft: "5%" }

    logoStyle = { width: "80px", height: "100%", backgroundColor: "#FFD700", fontSize: "14px", paddingLeft: "15px", borderRadius: "0 50% 50% 50%" }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-right" style={this.navStyle}>
                    <div className="container-fluid" >
                        <div style={this.logo}>
                            <div style={this.logoStyle}>New Zealand Cherry</div>
                        </div>

                        <a className="navbar-brand" href="/" style={{ color: "white" }}>Home</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" style={{ color: "white" }} to="/productmanager">Product Manager </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" style={{ color: "white" }} to="/features" >Features</Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" style={{ color: "white" }} to="/pricing">Pricing</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" style={{ color: "white" }} to="/contact">Contact</Link>
                                </li>
                               
                            </ul>
                        </div>
                        <a className="d-flex" style={{ color: "white" }} href="/login">
                            {window.localStorage.getItem("Token") ?
                                "My Profile" :
                                //"hello " + document.cookie.substring(document.cookie.lastIndexOf("=")+1) :
                                "Login "

                            }
                        </a>
                    </div>
                </nav>

            </React.Fragment>


        );
    }
}

export default Nav;