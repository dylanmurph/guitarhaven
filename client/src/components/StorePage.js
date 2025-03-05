import React, { Component } from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"
import "../css/storepage.css"

export default class StorePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guitars: [],
            searchValue: "",
            filterType: "all",
            sortChoice: "all"
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

    handleSearchChange = (event) => {
        this.setState({ searchValue: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filterType: event.target.value })
    }

    handleSortChange = (event) => {
        this.setState({ sortChoice: event.target.value })
    }

    getFilteredSortedGuitars() {
        const { guitars, searchValue, filterType, sortChoice } = this.state

        let filteredGuitars = guitars.filter(guitar =>
            guitar.name.toLowerCase().includes(searchValue.toLowerCase())
        )

        if (filterType !== "all") {
            filteredGuitars = filteredGuitars.filter(guitar => guitar.type === filterType)
        }
        if (sortChoice === "priceAsc") {
            filteredGuitars.sort((a, b) => a.price - b.price)
        }
        else if (sortChoice === "priceDesc") {
            filteredGuitars.sort((a, b) => b.price - a.price)
        }
        else if (sortChoice === "yearDesc") {
            filteredGuitars.sort((a, b) => b.year - a.year)
        }
        else if (sortChoice === "yearAsc") {
            filteredGuitars.sort((a, b) => a.year - b.year)
        }

        return filteredGuitars
    }

    render() {
        const filteredGuitars = this.getFilteredSortedGuitars()

        return (
            <div className="store-container">
                <h1>Guitar Store</h1>
                <p>Browse our collection of Guitars</p>

                <div className="store-controls">
                    <input className="search-bar-store"
                           type="text"
                           placeholder="Search..."
                           value={this.state.searchValue}
                           onChange={this.handleSearchChange}
                    />

                    <select className="filter-dropdown" onChange={this.handleFilterChange} value={this.state.filterType}>
                        <option value="all">All Types</option>
                        <option value="Electric">Electric</option>
                        <option value="Acoustic">Acoustic</option>
                        <option value="Bass">Bass</option>
                    </select>

                    <select className="sort-dropdown" onChange={this.handleSortChange} value={this.state.sortChoice}>
                        <option value="all">Default Sorting</option>
                        <option value="priceAsc">Price High to Low</option>
                        <option value="priceDesc">Price Low to High</option>
                        <option value="yearDesc">Year Newest</option>
                        <option value="yearAsc">Year Oldest</option>
                    </select>
                </div>

                <div className="store-tiles">
                    {filteredGuitars.map((guitar) => (
                        <div className="store-item" key={guitar.id}>
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
