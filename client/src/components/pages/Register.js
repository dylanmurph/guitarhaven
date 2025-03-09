import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import "../../css/form.css"
import {SERVER_HOST} from '../../config/global_constants'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            address1: "",
            address2: "",
            county: "",
            phone: "",
            image: "",
            isRegistered: false,
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            phoneError: ""
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value, [`${e.target.name}Error`]: ""})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const nameRegex = new RegExp("^[A-Za-z]+$")
        const phoneRegex = new RegExp("^\\d{9}$")
        const emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")

        let error = false

        if (!nameRegex.test(this.state.firstName)) {
            this.setState({firstNameError: "Please enter only your first name"})
            error = true
        }

        if (!nameRegex.test(this.state.lastName)) {
            this.setState({lastNameError: "Please enter only your last name"})
            error = true
        }

        if (!emailRegex.test(this.state.email)) {
            this.setState({emailError: "Please enter a valid email"})
            error = true
        }

        if (this.state.password.length < 8) {
            this.setState({passwordError: "Password must be at least 8 characters long"})
            error = true
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({confirmPasswordError: "Passwords do not match"})
            error = true
        }

        if (!phoneRegex.test(this.state.phone)) {
            this.setState({phoneError: "Please enter a valid phone number - format: 871231234"})
            error = true
        }

        if (error) return

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address1: this.state.address1,
            address2: this.state.address2,
            county: this.state.county,
            phone: this.state.phone,
            accessLevel: 1,
            image: this.state.image
        }

        axios.post(`${SERVER_HOST}/users/register`, newUser)
            .then(res => {
                if (res.data && res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    console.log("User registered successfully")

                    sessionStorage.name = `${this.state.firstName} ${this.state.lastName}`
                    sessionStorage.accessLevel = 1

                    this.setState({isRegistered: true})
                }
            })
            .catch(error => {
                console.log("Error during registration:", error)
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

        return (
            <div className="form-container">
                {this.state.isRegistered ? <Redirect to="/"/> : null}

                <form className="form" onSubmit={this.handleSubmit}>
                    <h2>Register</h2>

                    <div>
                        <input className="input-field" type="text" name="firstName" placeholder="First Name"
                               value={this.state.firstName} onChange={this.handleChange} required/>
                        <p className="error-message">{this.state.firstNameError}</p>
                    </div>
                    <div>
                        <input className="input-field" type="text" name="lastName" placeholder="Last Name"
                               value={this.state.lastName} onChange={this.handleChange} required/>
                        <p className="error-message">{this.state.lastNameError}</p>
                    </div>
                    <div>
                        <input className="input-field" type="text" name="email" placeholder="Email"
                               value={this.state.email} onChange={this.handleChange} required/>
                        <p className="error-message">{this.state.emailError}</p>
                    </div>
                    <div>
                        <input className="input-field" type="password" name="password" placeholder="Password"
                               value={this.state.password} onChange={this.handleChange} required/>
                        <p className="error-message">{this.state.passwordError}</p>
                    </div>
                    <div>
                        <input className="input-field" type="password" name="confirmPassword"
                               placeholder="Confirm Password" value={this.state.confirmPassword}
                               onChange={this.handleChange} required/>
                        <p className="error-message">{this.state.confirmPasswordError}</p>
                    </div>
                    <div>
                        <input className="input-field" type="text" name="address1" placeholder="Address Line 1"
                               value={this.state.address1} onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <input className="input-field" type="text" name="address2" placeholder="Address Line 2"
                               value={this.state.address2} onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <select name="county" value={this.state.county} onChange={this.handleChange}>
                            <option value="">Select County</option>
                            {counties.map((county) => (
                                <option key={county} value={county}>{county}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input className="input-field" type="number" name="phone" placeholder="Phone Number"
                               value={this.state.phone} onChange={this.handleChange} required/>
                        <p className="error-message">{this.state.phoneError}</p>
                    </div>
                    <div>
                        <input className="input-field" type="text" name="image" placeholder="Image"
                               value={this.state.image} onChange={this.handleChange} required/>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}
