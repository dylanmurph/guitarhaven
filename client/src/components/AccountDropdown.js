import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../css/login.css"

export default class AccountDropdown extends Component {
    render() {
        return (
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form>
                    <div className="login-form">
                        <input type="text" placeholder="email" className="input-field"/>
                    </div>
                    <div className="login-form">
                        <input type="password" placeholder="password" className="input-field"/>
                    </div>

                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>

                    <button type="submit" className="submit-button">Login</button>


                    <div className="register-container">
                        <p>Don't have an account?</p>
                        <button type="submit" className="submit-button">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}
