import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import GuitarTable from "./GuitarTable"
import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../../config/global_constants"
import "../../css/table.css"


export default class DisplayAllGuitars extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = {
            guitars:[],
            searchValue: "",
            filterType: "all",
            sortChoice: "all",
        }
    }

    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/guitars`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    console.log("Records read")   
                    this.setState({guitars: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }

    handleSearch = (e) => {this.setState({ searchValue: e.target.value })}

    handleSort = (e) => {this.setState({ sortChoice: e.target.value })}

    handleFilter = (e) => {this.setState({ filterType: e.target.value })}

    filterSortGuitars = () => {
        const { guitars, searchValue, filterType, sortChoice } = this.state

        let filteredGuitars = guitars.filter(guitar => {
            return guitar.name.toLowerCase().includes(searchValue.toLowerCase()) || guitar.model.toLowerCase().includes(searchValue.toLowerCase())})

        if (filterType !== "all") {
            filteredGuitars = filteredGuitars.filter(guitar => guitar.type.toLowerCase() === filterType.toLowerCase())
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

    render() 
    {

        const filteredSortedGuitars = this.filterSortGuitars()
        return (
            localStorage.accessLevel >= ACCESS_LEVEL_ADMIN
                ?
            <div>
                <div className="filter-sort-search-bar">
                    <input className="search-bar-table" type="text"
                           placeholder="Search by Name or Model"
                           value={this.state.searchValue}
                           onChange={this.handleSearch}/>

                    <select className="filter-dropdown" onChange={this.handleSort} value={this.state.sortChoice}>
                        <option value="all">Default Sorting</option>
                        <option value="priceAsc">Price Low to High</option>
                        <option value="priceDesc">Price High to Low</option>
                        <option value="yearDesc">Year Newest</option>
                        <option value="yearAsc">Year Oldest</option>
                    </select>

                    <select className="sort-dropdown" onChange={this.handleFilter} value={this.state.filterType}>
                        <option value="all">All Types</option>
                        <option value="electric">Electric</option>
                        <option value="acoustic">Acoustic</option>
                        <option value="bass">Bass</option>
                    </select>

                    <div className="add-guitar">
                        <Link className="button" to={"/AddGuitar"}>Add New Guitar</Link>
                    </div>
                </div>

                <div className="table-container">
                    <div>
                        <GuitarTable guitars={filteredSortedGuitars}/>
                    </div>
            </div>
            </div>
                :
                null

        )
    }
}