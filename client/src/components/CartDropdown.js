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
            totalPrice: 0
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
            this.setState({ cart: [], totalPrice: 0 })
            return
        }

        axios.get(`${SERVER_HOST}/cart`, cfg)
            .then(response => {
                const cartItems = response.data

                if (cartItems.length === 0) {
                    this.setState({ cart: [], totalPrice: 0 })
                    return
                }

                let totalPrice = 0
                const fetchGuitarDetails = cartItems.map(item => {
                    return axios.get(`${SERVER_HOST}/guitars/${item.guitarId}`)
                        .then(guitarRes => {
                            totalPrice += guitarRes.data.price * item.quantity;
                            return {
                                ...item,
                                guitarName: guitarRes.data.name,
                                guitarImage: `${SERVER_HOST}${guitarRes.data.image}`,
                            }
                        })
                        .catch(error => {
                            console.error(error)
                        })
                })

                Promise.all(fetchGuitarDetails).then(updatedCart => {
                    this.setState({ cart: updatedCart, totalPrice: totalPrice })
                })

            })
            .catch(error => {
                console.error(error)
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
                console.error(error)
            })
    }

    emptyCart = () => {
        return <p>No items in cart</p>
    }

    userCart = () => {
        const { cart, totalPrice } = this.state
        return (
            <div className="cart-table">
                <table>
                    <tbody>
                    {cart.map(item => (
                        <tr key={item.guitarId}>
                            <td>
                                <img src={item.guitarImage} alt={item.guitarName} width="50"/>
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
                <p>Total Price: €{totalPrice}</p>
                <Link to={{ pathname: "/payment",state: { price: totalPrice },}}>
                    Proceed to checkout
                </Link>
            </div>
        )
    }


    render() {
        const { cart} = this.state

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
