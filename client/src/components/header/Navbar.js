import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../../css/navbar.css';
import Logo from "../../images/logo.png";

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar-container">
                    <div className="logo-container">
                        <Link to="/"><img src={Logo} className="logo" alt="logo"/></Link>
                    </div>
                    <div className="search-container">
                        <input className="search-input" placeholder="Search..."/>
                    </div>
                    <div className="links-container">
                        <Link to="/login">Login</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/admin">Admin Tools</Link>
                    </div>
                </div>
            </div>
        )
    }
}
