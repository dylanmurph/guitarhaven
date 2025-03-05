import React, { Component } from "react"

export default class CartDropdown extends Component {
    render() {
        return (
            <div className="cart-container">
                <h2 className="cart-title">Your Cart</h2>
                <div className="cart-items">
                    <p>No items in cart</p>
                </div>
                <button className="checkout-button">Checkout</button>
            </div>
        )
    }
}
