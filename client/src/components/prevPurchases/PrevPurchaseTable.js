import React, {Component} from "react"
import PrevPurchaseTableRow from "./PrevPurchaseTableRow"

export default class PurchaseTable extends Component
{
    render()
    {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Model</th>
                    <th>Price</th>
                    <th>Purchase Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Returned</th>
                    <th>ReturnDate</th>
                </tr>
                </thead>

                <tbody>
                {this.props.purchases.map((purchases) =><PrevPurchaseTableRow key={purchases._id} purchase={purchases} />)}
                </tbody>
            </table>
        )
    }
}