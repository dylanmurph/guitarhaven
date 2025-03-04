import React, {Component} from "react"
import {Link} from "react-router-dom"


export default class UserTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.password}</td>
                <td>{this.props.user.address1}</td>
                <td>{this.props.user.address2}</td>
                <td>{this.props.user.county}</td>
                <td>{this.props.user.phone}</td>
                <td>{this.props.user.type}</td>
                <td>
                    <Link className="edit-button" to={"/EditUser/" + this.props.user._id}>Edit</Link>
                    <Link className="delete-button" to={"/DeleteUser/" + this.props.user._id}>Delete</Link>
                </td>
            </tr>
        )
    }
}