import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "../css/navdropdown.css"
import { SERVER_HOST } from "../config/global_constants"

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
        if (sessionStorage.getItem("name")) {
            this.setState({ isLoggedIn: true })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.defaults.withCredentials = true
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
            .then((res) => {
                if (res.data && !res.data.errorMessage) {
                    sessionStorage.setItem("name", res.data.name)
                    sessionStorage.setItem("accessLevel", res.data.accessLevel)
                    this.setState({ isLoggedIn: true, errorMessage: "" })
                } else {
                    this.setState({errorMessage: res.data.errorMessage})
                }})
            .catch((error) => {
                console.log("Error logging in:", error)
                this.setState({ errorMessage: "An error occurred. Please try again." })
            })
    }

    handleLogout = () => {
        sessionStorage.clear()
        this.setState({ isLoggedIn: false })
    }

    user() {
        const name = sessionStorage.getItem("name")
        const accessLevel = sessionStorage.getItem("accessLevel")

        return (
            <div className="account-menu">
                <div className="text-container">
                    <p className="account-text">Welcome, {name}</p>
                </div>

                <Link className="submit-button" to="/purchase-history">
                    Purchase History
                </Link>

                <Link className="submit-button" to="/modify-account">
                    Account Details
                </Link>

                {accessLevel === "2" ? (
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
                    <button type="button" className="submit-button">
                        Register
                    </button>
                </div>
            </form>
        )
    }

    render() {
        let dropdown
        if (this.state.isLoggedIn) {
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
