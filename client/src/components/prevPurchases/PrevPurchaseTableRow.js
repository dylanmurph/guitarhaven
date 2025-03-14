import React, { Component } from "react"
import axios from "axios"
import { SERVER_HOST } from "../../config/global_constants"
import "../../css/table.css"

export default class PurchaseTableRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            returned: props.purchase.returned,
            returnDate: props.purchase.returnDate,
            productDetails: null,
        }
    }

    componentDidMount() {
        const{item}=this.props

        axios.get(`${SERVER_HOST}/guitars/${item.guitarId}`)
            .then(res => {
                if (res.data && !res.data.errorMessage) {
                    this.setState({ productDetails: res.data })
                } else {
                    console.error("Error fetching product details:", res.data.errorMessage)
                }
            })
            .catch(err => console.error("Request failed:", err))
    }

    handleReturn = () => {
        const theDate = new Date().toLocaleDateString()

        axios.put(`${SERVER_HOST}/purchases/${this.props.purchase._id}`,
            { returned: true, returnDate: theDate },
            { headers: { authorization: localStorage.token } }
        )
            .then(res => {
                if (res.data && !res.data.errorMessage) {
                    this.setState({ returned: true, returnDate: theDate })
                } else {
                    console.error(res.data.errorMessage)
                }
            })
            .catch(err => console.error(err))
    }

    render() {
        const {purchase} = this.props
        const {returned, returnDate, productDetails} = this.state
        return (
            <tr>
                <td>{productDetails ? productDetails.name : "Loading..."}</td>
                <td>{productDetails ? productDetails.model : "Loading..."}</td>
                <td>{purchase.paypalPaymentID}</td>
                <td>€{productDetails ? productDetails.price : "..."}</td>
                <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                <td>{purchase.customerFirstName} {purchase.customerLastName}</td>
                <td>{purchase.customerEmail}</td>
                <td>{purchase.customerAddress1} {purchase.customerAddress2} {purchase.customerCounty}</td>
                <td>{purchase.customerPhone}</td>
                <td>{returned ? "Yes" : "No"}</td>
                <td>{returnDate ? returnDate : ""}</td>
                <td>
                    {!returned && (
                        <button className="return-button" onClick={this.handleReturn}>
                            Return
                        </button>)}
                </td>
            </tr>
        )
    }
}
