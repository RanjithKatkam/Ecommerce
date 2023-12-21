import { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css"

class LoginPage extends Component {
    state = {
        showSignup: false,
        loginEmail: "",
        loginPassword: "",
        signUpName: "",
        signUpEmail: "",
        signUpPassword: "",
        signUpConfirmPassword: "",
        errorMsg: ""
    }

    onClickShowSignupPage = () => {
        this.setState({showSignup: true, loginEmail: "", loginPassword: ""})
    }

    onClickShowLoginPage = () => {
        this.setState({showSignup: false})
    }

    onChangeLoginEmail = (event) => {
        this.setState({loginEmail: event.target.value})
    }

    onChangeLoginPassword = (event) => {
        this.setState({loginPassword: event.target.value})
    }

    onChangeSignupName = (event) => {
        this.setState({signUpName: event.target.value})
    }

    onChangeSignupEmail = (event) => {
        this.setState({signUpEmail: event.target.value})
    }

    onChangeSignupPassword = (event) => {
        this.setState({signUpPassword: event.target.value})
    }

    onChangeSignupConfirmPassword = (event) => {
        this.setState({signUpConfirmPassword: event.target.value})
    }



    onSubmitLoginButton = (event) => {
        const {history} = this.props
        event.preventDefault()
        const {loginEmail, loginPassword} =this.state
        if (loginEmail === "") {
            this.setState({errorMsg: "*please enter your email."})
        } else if (loginPassword === "") {
            this.setState({errorMsg: "*please enter your password."})
        } else if (loginEmail === "" && loginPassword === "") {
            this.setState({errorMsg: "*please enter login credentials."})
        } else {
            this.setState({errorMsg: ""})
            localStorage.setItem("LoginEmail",loginEmail)
            localStorage.setItem("LoginPassword",loginPassword)
            history.replace("/")
        }
    }

    onSubmitSignupButton = (event) => {
        event.preventDefault()
        const {signUpName, signUpEmail, signUpPassword, signUpConfirmPassword} =this.state
        if (signUpName === "" && signUpEmail === "" && signUpPassword === "" && signUpConfirmPassword === "") {
            this.setState({errorMsg: "*please enter your details"})
        } else if (signUpName === "") {
            this.setState({errorMsg: "*please enter your name"})
        } else if (signUpEmail === "" ){
            this.setState({errorMsg: "*please enter your email"})
        } else if (signUpPassword === ""){
            this.setState({errorMsg: "*please enter your password"})
        } else if (signUpConfirmPassword === ""){
            this.setState({errorMsg: "*please re-enter your password"})
        } else if (signUpPassword !== signUpConfirmPassword) {
            this.setState({errorMsg: "*please ensure both the passwords are same"})
        } else {
            localStorage.setItem("LoginEmail",signUpEmail)
            localStorage.setItem("LoginPassword",signUpPassword)
            this.props.history.replace("/")
        }

    }

    render(){
        const userName = localStorage.getItem("LoginEmail")
        const password = localStorage.getItem("LoginPassword")
        if (userName !== null && password !== null) {
            return <Redirect to="/" />
        }
        return(
            <div className="login-main-container">
                {
                    this.state.showSignup ? 
                    (
                        <>
                            <div className="img">
                                <img src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1702496239/3d-casual-life-girl-and-boy-with-boxes_u0gkrd.png" alt="img" />
                            </div>
                            <div className="signup-sub-container">
                                <form onSubmit={this.onSubmitSignupButton} className="signup-form-container">
                                    <h1 className="site-name">Shoppy</h1>
                                    <label className="login-label">Name</label>
                                    <input value={this.state.signUpName} onChange={this.onChangeSignupName} placeholder="Enter Your Name" className="input-box" type="text" />
                                    <label className="login-label">Email</label>
                                    <input value={this.state.signUpEmail} onChange={this.onChangeSignupEmail} placeholder="Enter Your Email" className="input-box" type="text" />
                                    <label  className="login-label">Password</label>
                                    <input value={this.state.signUpPassword} onChange={this.onChangeSignupPassword} placeholder="Enter Your Password" className="input-box" type="password" />
                                    <label className="login-label">Confirm Password</label>
                                    <input value={this.state.signUpConfirmPassword} onChange={this.onChangeSignupConfirmPassword} placeholder="Enter Your Password Again" className="input-box" type="password" />
                                    <button type="submit" className="login-button" >Sign Up</button>
                                    <p className="errorMsg">{this.state.errorMsg}</p>
                                </form>
                                <p className="login-para">Already have an account?<span><button onClick={this.onClickShowLoginPage} className="login-signup-button">Login</button></span></p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="img">
                                <img src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1702496319/3d-plastic-people-shopping-composition-of-shopping-cart-plant-bags-and-shoes_tdfeng.png" alt="img" />
                            </div>
                            <div className="login-sub-container">
                                <form onSubmit={this.onSubmitLoginButton} className="login-form-container">
                                    <h1 className="site-name">Shoppy</h1>
                                    <label className="login-label">Email</label>
                                    <input value={this.state.loginEmail} onChange={this.onChangeLoginEmail} placeholder="Enter Your Email" className="input-box" type="text" />
                                    <label  className="login-label">Password</label>
                                    <input value={this.state.loginPassword} onChange={this.onChangeLoginPassword} placeholder="Enter Your Password" className="input-box" type="password" />
                                    <button type="submit" className="login-button" >Login</button>
                                    <p className="errorMsg">{this.state.errorMsg}</p>
                                </form>
                                <p className="signup-para">Don't have an account?<span><button onClick={this.onClickShowSignupPage} className="login-signup-button">Sign Up</button></span></p>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}

export default LoginPage