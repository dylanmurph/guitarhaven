import React, { Component } from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"
import "../css/storepage.css"

export default class StorePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guitars: []
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/guitars`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Guitars fetched successfully")
                        this.setState({ guitars: res.data })
                    }
                } else {
                    console.log("No guitars found")
                }
            })
            .catch(error => console.error("Error fetching guitars:", error))
    }

    render() {
        return (
            <div className="store-container">
                <h1>Guitar Store</h1>
                <p>Browse our collection of Guitars</p>

                <div className="store-tiles">
                    {this.state.guitars.map((guitar) => (
                        <div className="store-item" key={guitar._id}>
                            <img src={`${SERVER_HOST}${guitar.image}`} alt={guitar.name} className="guitar-image"/>
                            <div className="guitar-details">
                                <p className="guitar-name">{guitar.name}</p>
                                <p className="guitar-model">{guitar.model}</p>
                                <p className="guitar-year">{guitar.year}</p>
                                <p className="guitar-price">€{guitar.price}</p>
                                <p className="guitar-type">{guitar.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
