import React, {Component} from "react"
import axios from "axios"
import {SERVER_HOST} from "../../config/global_constants"
import "../../css/table.css"

export default class PurchaseTableRow extends Component
{
    constructor(props) {
        super(props)

        this.state = {
            returned:props.purchase.returned,
            returnDate:props.purchase.returnDate
        }
    }

    handleReturn= () => {
        const theDate = new Date().toLocaleDateString()

        axios.put(`${SERVER_HOST}/purchases/${this.props.purchase._id}`, { returned: true, returnDate: theDate }, {
            headers: { authorization: localStorage.token }
        })
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Purchase Returned")
                        this.setState({
                            returned: true,
                            returnDate: theDate
                        })
                    }
                }
            })
            .catch(err => console.log(err))
    }

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
                <td>{this.state.returned ? "Yes" : "No"}</td>
                <td>{this.state.returnDate ? this.state.returnDate : ""}</td>
                <td>
                    {!this.state.returned ? (
                        <button className="return-button" onClick={this.handleReturn}>
                            Return
                        </button>) : null}
                </td>
            </tr>
        )
    }
}