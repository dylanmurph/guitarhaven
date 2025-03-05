import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class AccountDropdown extends Component {
    render() {
        return (
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form>
                    <div className="login-form">
                        <label>Username</label>
                        <input type="text" className="input-field" />
                    </div>
                    <div className="login-form">
                        <label>Password</label>
                        <input type="password" className="input-field" />
                    </div>


                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>


                    <button type="submit" className="login-submit">Login</button>


                    <div className="register-container">
                        <p>Don't have an account?</p>
                        <Link to="/register" className="register-button">Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}
