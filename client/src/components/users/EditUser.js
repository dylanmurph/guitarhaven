import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import LinkInClass from "../LinkInClass"
import axios from "axios"
import {ACCESS_LEVEL_ADMIN,SERVER_HOST} from "../../config/global_constants"

export default class EditUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address1: "",
            address2: "",
            county: "",
            phone: "",
            accessLevel: "",
            image: "",
            redirectToDisplayAllUsers: localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }


    componentDidMount() {
        this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/users/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        this.setState({
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            email: res.data.email,
                            password: res.data.password,
                            address1: res.data.address1,
                            address2: res.data.address2,
                            county: res.data.county,
                            phone: res.data.phone,
                            accessLevel: res.data.accessLevel,
                            image: res.data.image,
                        })
                    }
                } else {
                    console.log("Record not found")
                }
            })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const userObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address1: this.state.address1,
            address2: this.state.address2,
            county: this.state.county,
            phone: this.state.phone,
            accessLevel: this.state.accessLevel,
            image: this.state.image
        }

        axios.put(`${SERVER_HOST}/users/${this.props.match.params.id}`, userObject, {headers:{"authorization":localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Record updated")
                        this.setState({redirectToDisplayAllUsers: true})
                    }
                } else {
                    console.log("Record not updated")
                }
            })
    }

    render() {
        const counties = [
            "Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal",
            "Down", "Dublin", "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny",
            "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath",
            "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Tyrone",
            "Waterford", "Westmeath", "Wexford", "Wicklow"
        ]
        return (<div className="form-container">
                {this.state.redirectToDisplayAllUsers ? <Redirect to="/DisplayAllUsers"/> : null}

                <form>
                    <div>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                ref={(input) => {
                                    this.inputToFocus = input
                                }}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Email:
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Password:
                            <input
                                type="text"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Address Line 1:
                            <input
                                type="text"
                                name="address1"
                                value={this.state.address1}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Address Line 2:
                            <input
                                type="text"
                                name="address2"
                                value={this.state.address2}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            County:
                            <select
                                name="county"
                                value={this.state.county}
                                onChange={this.handleChange}
                            >
                                <option value="">Select County</option>
                                {counties.map((county) => (
                                    <option key={county} value={county}>{county}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Phone Number:
                            <input
                                type="number"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Access Level:
                            <input
                                type="number"
                                name="accessLevel"
                                value={this.state.accessLevel}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Image:
                            <input
                                type="text"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <LinkInClass value="Save Changes" className="green-button" onClick={this.handleSubmit}/>
                    <Link className="red-button" to="/DisplayAllUsers">Cancel</Link>
                </form>
            </div>
        )
    }
}
