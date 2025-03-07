import React, {Component} from "react"
import {Link} from "react-router-dom"
import {SERVER_HOST} from "../../config/global_constants"


export default class UserTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.address1}</td>
                <td>{this.props.user.address2}</td>
                <td>{this.props.user.county}</td>
                <td>{this.props.user.phone}</td>
                <td>{this.props.user.accessLevel}</td>
                <td><img src={`${SERVER_HOST}${this.props.user.image}`} alt={this.props.user.name} className="guitar-image"/></td>
                <td>
                    <Link className="delete-button" to={"/DeleteUser/" + this.props.user._id}>Delete</Link>
                </td>
            </tr>
        )
    }
}