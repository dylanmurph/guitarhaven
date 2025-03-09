import React, { Component } from "react"
import axios from "axios"
import PrevPurchaseTable from "./PrevPurchaseTable"
import { ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../../config/global_constants"
import "../../css/table.css"

export default class PrevPurchasesDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            purchases: [],
            searchValue: "",
            filterType: "all",
            sortChoice: "all",
        }
    }

    componentDidMount() {
        const userName = localStorage.getItem("name")
        axios.get(`${SERVER_HOST}/purchases`, { headers: { authorization: localStorage.token } })
            .then(res => {
                if (res.data && !res.data.errorMessage) {
                    const userPurchases = res.data.filter(purchase =>
                        `${purchase.customerFirstName} ${purchase.customerLastName}` === userName
                    )
                    this.setState({ purchases: userPurchases })
                } else {
                    console.error(res.data?.errorMessage || "Record not found")
                }
            })
            .catch(error => console.error("Error fetching purchases:", error))
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    filterSortPurchases = () => {
        const { purchases, searchValue, filterType, sortChoice } = this.state

        let filteredPurchases = purchases.filter(purchase => {
            const combinedData = Object.values({
                purchaseDate: new Date(purchase.purchaseDate).toLocaleDateString(),
                returnDate: purchase.returnDate ? new Date(purchase.returnDate).toLocaleDateString() : "N/A",
                customerName: `${purchase.customerFirstName} ${purchase.customerLastName}`,
                customerEmail: purchase.customerEmail,
                customerPhone: purchase.customerPhone.toString(),
                customerAddress: `${purchase.customerAddress1} ${purchase.customerAddress2} ${purchase.customerCounty}`,
                totalPayment: purchase.totalPayment.toString(),
                cart: purchase.cart.map(item => item.guitarId).join(", "),
            }).join(" ").toLowerCase()

            return combinedData.includes(searchValue.toLowerCase())
        })

        if (filterType !== "all") {
            filteredPurchases = filteredPurchases.filter(purchase => String(purchase.returned) === filterType)
        }

        const sortingOptions = {
            NameAsc: (a, b) => a.customerFirstName.localeCompare(b.customerFirstName),
            NameDesc: (a, b) => b.customerFirstName.localeCompare(a.customerFirstName),
            DateAsc: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
            DateDesc: (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate),
        }

        if (sortChoice in sortingOptions) {
            filteredPurchases.sort(sortingOptions[sortChoice])
        }

        return filteredPurchases
    }

    render() {
        const { searchValue, sortChoice, filterType } = this.state
        const filteredSortedPurchases = this.filterSortPurchases()
        const accessLevel = localStorage.accessLevel || 0

        return (
            accessLevel >= ACCESS_LEVEL_NORMAL_USER ? (
                <div>
                    <div className="filter-sort-search-bar">
                        <input
                            className="search-bar-table"
                            type="text"
                            placeholder="Search..."
                            name="searchValue"
                            value={searchValue}
                            onChange={this.handleChange}
                        />

                        <select className="sort-dropdown" name="sortChoice" onChange={this.handleChange} value={sortChoice}>
                            <option value="all">Default Sorting</option>
                            <option value="NameAsc">Name Ascending</option>
                            <option value="NameDesc">Name Descending</option>
                            <option value="DateAsc">Date Ascending</option>
                            <option value="DateDesc">Date Descending</option>
                        </select>

                        <select className="filter-dropdown" name="filterType" onChange={this.handleChange} value={filterType}>
                            <option value="all">Purchases and Returns</option>
                            <option value="false">Purchases</option>
                            <option value="true">Returns</option>
                        </select>
                    </div>

                    <div className="table-container">
                        <PrevPurchaseTable purchases={filteredSortedPurchases} />
                    </div>
                </div>
            ) : null
        )
    }
}