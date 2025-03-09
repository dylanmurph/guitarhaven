import React, { Component } from "react"
import PurchaseTableRow from "./PurchaseTableRow"

export default class PurchaseTable extends Component {
    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Model</th>
                    <th>Quantity</th>
                    <th>Paypal ID</th>
                    <th>Price</th>
                    <th>Purchase Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Returned</th>
                    <th>Return Date</th>
                </tr>
                </thead>

                <tbody>
                {this.props.purchases.map((purchase) => (
                    purchase.cart.map((item, index) => (
                        <PurchaseTableRow key={`${purchase._id}-${index}`} purchase={purchase} item={item} />))))}
                </tbody>
            </table>
        )
    }
}