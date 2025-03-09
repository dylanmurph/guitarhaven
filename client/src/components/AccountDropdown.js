import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "../css/navdropdown.css"
import {ACCESS_LEVEL_ADMIN,ACCESS_LEVEL_GUEST, SERVER_HOST } from "../config/global_constants"

export default class AccountDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            isLoggedIn: false,
        }
    }

    componentDidMount() {
        if (localStorage.getItem("name")&&localStorage.getItem("token")) {
            this.setState({ isLoggedIn: true })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()


        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
            .then((res) => {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log("User logged in")

                        localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token

                        this.setState({isLoggedIn:true})
                    }
                }
                else
                {
                    console.log("Login failed")
                }
            })
    }

    handleLogout = () => {
        console.log("User logged out")
        localStorage.clear()

        this.setState({isLoggedIn:false})
    }

    user() {
        const name = localStorage.getItem("name")
        const userId = localStorage.getItem("userId")
        return (
            <div className="account-menu">
                <div className="text-container">
                    <p className="account-text">Welcome, {name}</p>
                </div>

                <Link className="submit-button" to="/prevPurchasesDisplay">
                   Your Purchases
                </Link>

                <Link className="submit-button" to={`/accountDetails/${userId}`}>
                    Account Details
                </Link>

                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
                    <Link className="submit-button" to="/admin">
                        Admin Tools
                    </Link>
                ) : null}

                <button onClick={this.handleLogout} className="submit-button">
                    Logout
                </button>
            </div>
        )
    }

    guest() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="login-form">
                    <input
                        type="text"
                        placeholder="Email"
                        className="input-field"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="login-form">
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>

                {this.state.errorMessage && (
                    <div className="error-message">
                        <p>{this.state.errorMessage}</p>
                    </div>
                )}

                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <button type="submit" className="submit-button">
                    Login
                </button>

                <div className="text-container">
                    <p className="account-text">Don't have an account?</p>
                    <Link to="register" className="submit-button">Register</Link>
                </div>
            </form>
        )
    }

    render() {
        let dropdown
        if (localStorage.accessLevel>ACCESS_LEVEL_GUEST) {
            dropdown = this.user()
        } else {
            dropdown = this.guest()
        }

        return (
            <div className="account-container">
                <h2 className="account-title">
                    {this.state.isLoggedIn ? "Account" : "Login"}
                </h2>
                {dropdown}
            </div>
        )
    }
}
