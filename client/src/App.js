import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import AddGuitar from "./components/AddGuitar"
import EditGuitar from "./components/EditGuitar"
import DeleteGuitar from "./components/DeleteGuitar"
import DisplayAllGuitars from "./components/DisplayAllGuitars"

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={DisplayAllGuitars} />
                    <Route exact path="/AddGuitar" component={AddGuitar} />
                    <Route exact path="/EditGuitar/:id" component={EditGuitar} />
                    <Route exact path="/DeleteGuitar/:id" component={DeleteGuitar} />
                    <Route exact path="/DisplayAllGuitars" component={DisplayAllGuitars}/> 
                    <Route path="*" component={DisplayAllGuitars}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}