import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../css/navbar.css"
import Logo from "../images/logo.png"
import LoginIcon from "../images/login.png"
import CartIcon from "../images/cart.png"
import SearchIcon from "../images/search.png"
import AccountDropdown from "./AccountDropdown"
import CartDropdown from "./CartDropdown"

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginDropdownOpen: false,
            cartDropdownOpen: false,
        }
    }

    toggleLoginDropdown = () => {
        this.setState((prevState) => ({
            loginDropdownOpen: !prevState.loginDropdownOpen,
            cartDropdownOpen: false,
        }))
    }

    toggleCartDropdown = () => {
        this.setState((prevState) => ({
            cartDropdownOpen: !prevState.cartDropdownOpen,
            loginDropdownOpen: false,
        }))
    }

    closeDropdowns = (e) => {
        if (!e.target.closest(".dropdown-container")) {
            this.setState({
                loginDropdownOpen: false,
                cartDropdownOpen: false,
            })
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.closeDropdowns)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.closeDropdowns)
    }

    render() {
        const { loginDropdownOpen, cartDropdownOpen } = this.state

        return (
            <div className="navbar">
                <div className="navbar-container">
                    <div className="logo-container">
                        <Link to="/"><img src={Logo} className="logo" alt="logo" /></Link>
                    </div>

                    <div className="search-container">
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                            <button type="submit" className="search-button">
                                <img src={SearchIcon} alt="Search" />
                            </button>
                        </div>
                    </div>

                    <div className="links-container">
                        <Link to="/admin">Admin Tools</Link>
                        <Link to="/store">Store</Link>

                        <div className="dropdown-container">
                            <button onClick={this.toggleLoginDropdown} className="login-button">
                                <img src={LoginIcon} alt="AccountDropdown" />
                            </button>

                            {loginDropdownOpen && (
                                <div className="dropdown login-dropdown">
                                    <AccountDropdown />
                                </div>
                            )}
                        </div>

                        <div className="dropdown-container">
                            <button onClick={this.toggleCartDropdown} className="cart-button">
                                <img src={CartIcon} alt="Cart" />
                            </button>

                            {cartDropdownOpen && (
                                <div className="dropdown cart-dropdown">
                                    <CartDropdown />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
