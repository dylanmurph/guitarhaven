import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../../css/Login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <h1>Login</h1>
                <form>
                    <div className="login-form">
                        <label>Username</label>
                        <input type="text"></input>
                    </div>
                    <div className="login-form">
                        <label>Password</label>
                        <input type="text"></input>
                    </div>
                    <button className="login-button">Login</button>
                </form>
            </div>
        );
    }
}
