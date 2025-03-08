import React, {Component} from "react"

export default class PurchaseTableRow extends Component
{
    render()
    {
        return (
            <tr>
                <td>{this.props.purchase.productName}</td>
                <td>{this.props.purchase.productModel}</td>
                <td>€{this.props.purchase.productPrice}</td>
                <td>{this.props.purchase.purchaseDate}</td>
                <td>{this.props.purchase.customerFirstName} {this.props.purchase.customerLastName}</td>
                <td>{this.props.purchase.customerEmail}</td>
                <td>{this.props.purchase.customerAddress1} {this.props.purchase.customerAddress2} {this.props.purchase.customerCounty}</td>
                <td>{this.props.purchase.customerPhone}</td>
                <td>{this.props.purchase.returned? "Yes" : "No"}</td>
                <td>{this.props.purchase.returnDate|| "N/A"}</td>

            </tr>
        )
    }
}