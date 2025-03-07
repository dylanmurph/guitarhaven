import React, { Component } from "react"
import "../css/navdropdown.css"
import {Link} from "react-router-dom";

export default class CartDropdown extends Component {
    render() {
        return (
            <div className="cart-container">
                <h2 className="cart-title">Cart</h2>
                <div className="cart-items">
                    <p>No items in cart</p>
                </div>

                <Link className="submit-button" to="/checkout">Checkout</Link>
            </div>
        )
    }
}
