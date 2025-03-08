import React, {Component} from "react"
import axios from "axios"
import PrevPurchaseTable from "./PrevPurchaseTable"
import { ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../../config/global_constants"
import "../../css/table.css"


export default class PrevPurchasesDisplay extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            purchases:[],
            searchValue: "",
            filterType: "all",
            sortChoice: "all",
        }
    }


    componentDidMount()
    {
        const UserName = localStorage.getItem("name")
        console.log(UserName)
        axios.get(`${SERVER_HOST}/purchases`, {headers:{"authorization":localStorage.token}})
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
                        const userPurchases = res.data.filter(purchase =>
                            (purchase.customerFirstName+" "+purchase.customerLastName) === UserName)
                        this.setState({purchases: userPurchases})
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

    filterSortPurchases = () => {
        const { purchases, searchValue, filterType, sortChoice } = this.state

        let filteredPurchases = purchases.filter(purchase => {
            const address =purchase.customerAddress1+" "+purchase.customerAddress2+" "+purchase.customerCounty
            const customerName =purchase.customerFirstName+" "+purchase.customerLastName

            return purchase.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
                purchase.productModel.toLowerCase().includes(searchValue.toLowerCase()) ||
                purchase.purchaseDate.toLowerCase().includes(searchValue.toLowerCase()) ||
                customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
                purchase.customerEmail.toLowerCase().includes(searchValue.toLowerCase()) ||
                purchase.customerPhone.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
                address.toLowerCase().includes(searchValue.toLowerCase()) ||
                purchase.returnDate.toLowerCase().includes(searchValue.toLowerCase())
        })

        if (filterType !== "all") {
            filteredPurchases = filteredPurchases.filter(purchase => String(purchase.returned) === filterType)
        }

        if (sortChoice === "NameAsc") {
            filteredPurchases.sort((a, b) => (a.customerFirstName > b.customerFirstName ? 1 : -1))
        }
        else if (sortChoice === "NameDesc") {
            filteredPurchases.sort((a, b) => (a.customerFirstName < b.customerFirstName ? 1 : -1))
        }
        else if (sortChoice === "productNameAsc") {
            filteredPurchases.sort((a, b) => (a.productName > b.productName ? 1 : -1))
        }
        else if (sortChoice === "productNameDesc") {
            filteredPurchases.sort((a, b) => (a.productName < b.productName ? 1 : -1))
        }
        else if (sortChoice === "productModelAsc") {
            filteredPurchases.sort((a, b) => (a.productModel < b.productModel ? 1 : -1))
        }
        else if (sortChoice === "productModelDesc") {
            filteredPurchases.sort((a, b) => (a.productModel > b.productModel ? 1 : -1))
        }
        return filteredPurchases
    }



    render()
    {
        const filteredSortedPurchases = this.filterSortPurchases()
        return (
            localStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER ?
                <div>
                    <div className="filter-sort-search-bar">
                        <input className="search-bar-table" type="text"
                               placeholder="Search..."
                               value={this.state.searchValue}
                               onChange={this.handleSearch}/>

                        <select className="sort-dropdown" onChange={this.handleSort} value={this.state.sortChoice}>
                            <option value="all">Default Sorting</option>
                            <option value="NameAsc">Name Ascending</option>
                            <option value="NameDesc">Name Descending</option>
                            <option value="productNameAsc">productName Ascending</option>
                            <option value="productNameDesc">productName Descending</option>
                            <option value="productModelAsc">productModel Ascending</option>
                            <option value="productModelDesc">productModel Descending</option>
                        </select>

                        <select className="filter-dropdown" onChange={this.handleFilter} value={this.state.filterType}>
                            <option value="all">Purchases and Returns</option>
                            <option value="false">Purchases</option>
                            <option value="true">Returns</option>
                        </select>
                    </div>

                    <div className="table-container">
                        <div>
                            <PrevPurchaseTable purchases={filteredSortedPurchases} />
                        </div>
                    </div>
                </div>
                : null
        )
    }
}