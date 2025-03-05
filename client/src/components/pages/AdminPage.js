import React, { Component } from "react"
import {Link} from "react-router-dom"
import '../../css/AdminPage.css'

export default class AdminPage extends Component {
    render() {
        return (
            <div className="admin-container">
                <h1>Admin Dashboard</h1>
                <Link className="button" to={"/DisplayAllGuitars"}>View Guitars</Link>
                <Link className="button" to={"/DisplayAllUsers"}>View Users</Link>
            </div>
        )
    }
}
