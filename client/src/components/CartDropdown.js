import React, { Component } from "react"
import "../css/navdropdown.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"

export default class CartDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
        }
    }

    componentDidMount() {
        this.displayCart()
    }

    displayCart = () => {
        const token = localStorage.getItem("token")
        const cfg = {
            headers: { Authorization: `JWT ${token}` }
        }

        if (!token) {
            this.setState({ cart: [] })
            return
        }

        axios.get(`${SERVER_HOST}/cart`, cfg)
            .then(response => {
                const cartItems = response.data

                if (cartItems.length === 0) {
                    this.setState({ cart: [] })
                    return
                }

                const fetchGuitarDetails = cartItems.map(item => {
                    return axios.get(`${SERVER_HOST}/guitars/${item.guitarId}`)
                        .then(guitarRes => {
                            return {
                                ...item,
                                guitarName: guitarRes.data.name,
                                guitarImage: `${SERVER_HOST}${guitarRes.data.image}`,
                            }
                        })
                        .catch(err => {
                            return { ...item, guitarName: "Unknown Guitar", guitarImage: "" }
                        })
                })

                Promise.all(fetchGuitarDetails).then(updatedCart => {
                    this.setState({ cart: updatedCart })
                })

            })
            .catch(error => {
                console.error("❌ Error fetching cart:", error)
            })
    }

    handleRemoveItem = (guitarId) => {
        const token = localStorage.getItem("token")
        const cfg = {
            headers: { Authorization: `JWT ${token}` }
        }

        axios.delete(`${SERVER_HOST}/cart/remove/${guitarId}`, cfg)
            .then(() => {
                const updatedCart = this.state.cart.filter(item => item.guitarId !== guitarId)
                this.setState({ cart: updatedCart })
            })
            .catch(error => {
                console.error("❌ Error removing item from cart:", error)
            })
    }

    emptyCart = () => {
        return <p>No items in cart</p>
    }

    userCart = () => {
        const { cart } = this.state
        return (
            <div className="cart-items">
                <table>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map(item => (
                        <tr key={item.guitarId}>
                            <td>
                                <img src={item.guitarImage} alt={item.guitarName} width="50" />
                            </td>
                            <td>{item.guitarName}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button onClick={() => this.handleRemoveItem(item.guitarId)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link className="submit-button" to="/checkout">Checkout</Link>
            </div>
        )
    }

    render() {
        const { cart } = this.state

        if (cart.length === 0) {
            return (
                <div className="cart-container">
                    <h2 className="cart-title">Cart</h2>
                    {this.emptyCart()}
                </div>
            )
        }

        return (
            <div className="cart-container">
                <h2 className="cart-title">Cart</h2>
                {this.userCart()}
            </div>
        )
    }
}
