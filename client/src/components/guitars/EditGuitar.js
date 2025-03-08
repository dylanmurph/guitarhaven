import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import LinkInClass from "../LinkInClass"
import axios from "axios"
import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../../config/global_constants"
import "../../css/form.css"

export default class EditGuitar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            model: "",
            year: "",
            price: "",
            type: "",
            stock:0,
            image: "",
            redirectToDisplayAllGuitars: localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }

    componentDidMount() {
        this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/guitars/${this.props.match.params.id}`, {headers: {"authorization": localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        this.setState({
                            name: res.data.name,
                            model: res.data.model,
                            year: res.data.year,
                            price: res.data.price,
                            type: res.data.type,
                            stock: res.data.stock,
                            image: res.data.image
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

        const guitarObject = {
            name: this.state.name,
            model: this.state.model,
            year: Number(this.state.year),
            price: Number(this.state.price),
            stock: Number(this.state.stock),
            type: this.state.type,
            image: this.state.image,
        }

        axios.put(`${SERVER_HOST}/guitars/${this.props.match.params.id}`, guitarObject, {headers: {"authorization": localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Record updated")
                        this.setState({redirectToDisplayAllGuitars: true})
                    }
                } else {
                    console.log("Record not updated")
                }
            })
    }

    render() {
        return (
            <div className="form-container">
                {this.state.redirectToDisplayAllGuitars ? <Redirect to="/DisplayAllGuitars"/> : null}

                <form className="form">
                    <h2>Register</h2>

                    <div>
                        <label>
                            Name:
                            <input
                                className="input-field"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                ref={(input) => {
                                    this.inputToFocus = input
                                }}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Model:
                            <input
                                className="input-field"
                                type="text"
                                name="model"
                                value={this.state.model}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Year:
                            <input
                                className="input-field"
                                type="number"
                                name="year"
                                value={this.state.year}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Price:
                            <input
                                className="input-field"
                                type="number"
                                name="price"
                                value={this.state.price}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Type:
                            <select
                                name="type"
                                value={this.state.type}
                                onChange={this.handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="Acoustic">Acoustic</option>
                                <option value="Electric">Electric</option>
                                <option value="Electric">Base</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Stock:
                            <input
                                className="input-field"
                                type="number"
                                name="stock"
                                value={this.state.stock}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Image:
                            <input
                                className="input-field"
                                type="text"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <LinkInClass className="submit-button" value="Save Changes" onClick={this.handleSubmit}/>
                    <Link className="submit-button" to="/DisplayAllGuitars">Cancel</Link>
                </form>
            </div>
        )
    }
}
