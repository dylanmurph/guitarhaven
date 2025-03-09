import React, {Component} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom"
import {SANDBOX_CLIENT_ID, SERVER_HOST} from "../config/global_constants"
import PayPalMessage from "./PayPalMessage"
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"
import "../css/paypal.css"

export default class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToPayPalMessage: false,
            payPalMessageType: null,
            payPalOrderID: null,
        }
    }

    createOrder = (data, actions) => {
        const {price} = this.props.location.state

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: price,
                    },
                },
            ],
        })
    }

    onApprove = (paymentData) => {
        const {price} = this.props.location.state
        const paypalPaymentID = paymentData.orderID

        const token = localStorage.getItem("token")
        const cfg = {
            headers: {Authorization: `JWT ${token}`},
        }

        if (!token) {
            console.error("Token not found")
            return
        }

        axios.post(`${SERVER_HOST}/purchases/paypal`, {paypalPaymentID: paypalPaymentID, totalPayment: price,}, cfg)
            .then((res) => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.SUCCESS,
                    payPalOrderID: paymentData.orderID,
                    redirectToPayPalMessage: true,
                })
            })
            .catch((errorData) => {
                console.error("Error:", errorData)
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage: true,
                })
            })

        localStorage.removeItem('paypalData')
    }

    onError = (errorData) => {
        console.error("PayPal error occurred:", errorData)
        this.setState({
            payPalMessageType: PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage: true,
        })
    }

    // onCancel = (cancelData) => {
    //     this.setState({
    //         payPalMessageType: PayPalMessage.messageType.CANCEL,
    //         redirectToPayPalMessage: true,
    //     })
    // }
    onCancel = (cancelData) => {
        console.warn("User cancelled PayPal transaction", cancelData);

        // Ensure PayPal SDK doesn't throw errors when window is closed
        setTimeout(() => {
            this.setState({
                payPalMessageType: PayPalMessage.messageType.CANCEL,
                redirectToPayPalMessage: true,
            });
        }, 500); // Small delay to prevent race conditions
    };

    render() {
        return (
            <div className="paypal-container">
                {this.state.redirectToPayPalMessage ? (
                    <Redirect to={`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`}/>
                ) : null}

                <PayPalScriptProvider options={{currency: "EUR", "client-id": SANDBOX_CLIENT_ID}}>
                    <PayPalButtons
                        className="paypal-button"
                        style={{layout: "horizontal"}}
                        createOrder={this.createOrder}
                        onApprove={this.onApprove}
                        onError={this.onError}
                        onCancel={this.onCancel}
                    />
                </PayPalScriptProvider>
            </div>
        )
    }
}
