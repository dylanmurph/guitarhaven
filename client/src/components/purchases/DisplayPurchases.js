import React, { Component } from "react"
import axios from "axios"
import PurchaseTable from "./PurchaseTable"
import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../../config/global_constants"
import "../../css/table.css"

export default class DisplayPurchases extends Component {
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
        axios.get(`${SERVER_HOST}/purchases`, { headers: { "authorization": localStorage.token } })
            .then(res => {
                if (res.data && !res.data.errorMessage) {
                    console.log("Records read")
                    this.setState({ purchases: res.data })
                } else {
                    console.error(res.data?.errorMessage || "Record not found")
                }
            })
            .catch(err => console.error("Error fetching purchases:", err))
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    filterSortPurchases = () => {
        const { purchases, searchValue, filterType, sortChoice } = this.state;

        let filteredPurchases = purchases.filter(purchase => {
            const combinedData = Object.values({
                purchaseDate: purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : "",
                returnDate: purchase.returnDate ? new Date(purchase.returnDate).toLocaleDateString() : "N/A",
                customerName: `${purchase.customerFirstName || ""} ${purchase.customerLastName || ""}`,
                customerEmail: purchase.customerEmail || "",
                customerPhone: purchase.customerPhone ? purchase.customerPhone.toString() : "",
                customerAddress: `${purchase.customerAddress1 || ""} ${purchase.customerAddress2 || ""} ${purchase.customerCounty || ""}`,
                totalPayment: purchase.totalPayment ? purchase.totalPayment.toString() : "",
                cart: purchase.cart?.map(item => item.guitarId || "").join(", ") || "",
                paypalPaymentID: purchase.paypalPaymentID || ""
            }).join(" ").toLowerCase();

            return combinedData.includes(searchValue.toLowerCase());
        });

        if (filterType !== "all") {
            filteredPurchases = filteredPurchases.filter(purchase => String(purchase.returned) === filterType);
        }

        const sortingOptions = {
            NameAsc: (a, b) => (a.customerFirstName || "").localeCompare(b.customerFirstName || ""),
            NameDesc: (a, b) => (b.customerFirstName || "").localeCompare(a.customerFirstName || ""),
            DateAsc: (a, b) => new Date(a.purchaseDate || 0) - new Date(b.purchaseDate || 0),
            DateDesc: (a, b) => new Date(b.purchaseDate || 0) - new Date(a.purchaseDate || 0),
        };

        if (sortChoice in sortingOptions) {
            filteredPurchases.sort(sortingOptions[sortChoice]);
        }

        return filteredPurchases;
    };


    render() {
        const filteredSortedPurchases = this.filterSortPurchases()
        return (
            localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
                <div>
                    <div className="filter-sort-search-bar">
                        <input
                            className="search-bar-table"
                            type="text"
                            placeholder="Search..."
                            name="searchValue"
                            value={this.state.searchValue}
                            onChange={this.handleChange}
                        />

                        <select className="sort-dropdown" name="sortChoice" onChange={this.handleChange} value={this.state.sortChoice}>
                            <option value="all">Default Sorting</option>
                            <option value="NameAsc">Name Ascending</option>
                            <option value="NameDesc">Name Descending</option>
                            <option value="DateAsc">Date Ascending</option>
                            <option value="DateDesc">Date Descending</option>
                        </select>

                        <select className="filter-dropdown" name="filterType" onChange={this.handleChange} value={this.state.filterType}>
                            <option value="all">Purchases and Returns</option>
                            <option value="false">Purchases</option>
                            <option value="true">Returns</option>
                        </select>
                    </div>

                    <div className="table-container">
                        <PurchaseTable purchases={filteredSortedPurchases} />
                    </div>
                </div>
            ) : null
        )
    }
}