import React, {Component} from "react"
import {Link} from "react-router-dom"

export default class GuitarTableRow extends Component 
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.guitar.name}</td>
                <td>{this.props.guitar.model}</td>
                <td>{this.props.guitar.year}</td>
                <td>{this.props.guitar.price}</td>
                <td>{this.props.guitar.type}</td>
                <td>
                    <Link className="edit-button" to={"/EditGuitar/" + this.props.guitar._id}>Edit</Link>
                    <Link className="delete-button" to={"/DeleteGuitar/" + this.props.guitar._id}>Delete</Link>
                </td>
            </tr>
        )
    }
}