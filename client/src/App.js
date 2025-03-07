import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import './css/app.css'

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./components/pages/Home"
import AccountDropdown from "./components/AccountDropdown"
import ContactPage from "./components/pages/ContactPage"
import CartPage from "./components/pages/CartPage"
import AdminPage from "./components/pages/AdminPage"
import EditGuitar from "./components/guitars/EditGuitar"
import DeleteGuitar from "./components/guitars/DeleteGuitar"
import DisplayAllGuitars from "./components/guitars/DisplayAllGuitars"
import AddGuitar from "./components/guitars/AddGuitar"
import DisplayAllUsers from "./components/users/DisplayAllUsers"
import EditUser from "./components/users/EditUser"
import DeleteUser from "./components/users/DeleteUser"
import AddUser from "./components/users/AddUser"
import StorePage from "./components/StorePage"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
}


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <Navbar/>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/account" component={AccountDropdown}/>
                            <Route exact path="/contact" component={ContactPage}/>
                            <Route exact path="/cart" component={CartPage}/>
                            <Route exact path="/admin" component={AdminPage}/>

                            <Route exact path="/displayAllGuitars" component={DisplayAllGuitars}/>
                            <Route exact path="/editGuitar/:id" component={EditGuitar}/>
                            <Route exact path="/deleteGuitar/:id" component={DeleteGuitar}/>
                            <Route exact path="/AddGuitar" component={AddGuitar}/>

                            <Route exact path="/displayAllUsers" component={DisplayAllUsers}/>
                            <Route exact path="/editUser/:id" component={EditUser}/>
                            <Route exact path="/deleteUser/:id" component={DeleteUser}/>
                            <Route exact path="/AddUser" component={AddUser}/>

                            <Route exact path="/store" component={StorePage} />
                            <Route path="/store/:category" component={StorePage}/>

                            <Route path="*" component={() => <h3>Invalid URL. Webpage does not exist</h3>}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}
