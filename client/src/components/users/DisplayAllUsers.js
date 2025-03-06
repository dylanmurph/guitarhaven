import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import UserTable from "./UserTable"
import {SERVER_HOST} from "../../config/global_constants"

import "../../css/table.css"

export default class DisplayAllUsers extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            users:[],
            searchValue: "",
            filterType: "all",
            sortChoice: "all"
        }
    }

    componentDidMount()
    {
        axios.get(`${SERVER_HOST}/users`)
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
                        this.setState({users: res.data})
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

    filterSortUsers = () => {
        const { users, searchValue, filterType, sortChoice } = this.state

        let filteredUsers = users.filter(user => {
            return user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.phone.toString().includes(searchValue) ||
                user.address1.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.address2.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.county.toLowerCase().includes(searchValue.toLowerCase())
        })

        if (filterType !== "all") {
            filteredUsers = filteredUsers.filter(user => user.accessLevel.toString() === filterType)
        }

        if (sortChoice === "firstNameAsc") {
            filteredUsers.sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
        }
        else if (sortChoice === "firstNameDesc") {
            filteredUsers.sort((a, b) => (a.firstName < b.firstName ? 1 : -1))
        }
        else if (sortChoice === "lastNameAsc") {
            filteredUsers.sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
        }
        else if (sortChoice === "lastNameDesc") {
            filteredUsers.sort((a, b) => (a.lastName < b.lastName ? 1 : -1))
        }
        else if (sortChoice === "countyDesc") {
            filteredUsers.sort((a, b) => (a.county < b.county ? 1 : -1))
        }
        else if (sortChoice === "countyAsc") {
            filteredUsers.sort((a, b) => (a.county > b.county ? 1 : -1))
        }
        return filteredUsers
    }

    render()
    {
        const filteredSortedUsers = this.filterSortUsers()
        return (
            <div>
                <div className="filter-sort-search-bar">
                    <input className="search-bar-table" type="text"
                           placeholder="Search..."
                           value={this.state.searchValue}
                           onChange={this.handleSearch}/>

                    <select className="sort-dropdown" onChange={this.handleSort} value={this.state.sortChoice}>
                        <option value="all">Default Sorting</option>
                        <option value="firstNameAsc">FirstName Ascending</option>
                        <option value="firstNameDesc">FirstName Descending</option>
                        <option value="lastNameAsc">LastName Ascending</option>
                        <option value="lastNameDesc">LastName Descending</option>
                        <option value="countyAsc">County Ascending</option>
                        <option value="countyDesc">County Descending</option>
                    </select>

                    <select className="filter-dropdown" onChange={this.handleFilter} value={this.state.filterType}>
                        <option value="all">All Access Levels</option>
                        <option value="2">Admin</option>
                        <option value="1">Customer</option>
                    </select>
                </div>

                <div className="table-container">
                    <div>
                        <UserTable users={filteredSortedUsers} />

                        <div className="submit-container">
                            <Link className="button" to={"/AddUser"}>Add New User</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}