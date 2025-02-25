import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class AddGuitar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name:"",
            model:"",
            year:"",
            price:"",
            type:"",
            redirectToDisplayAllGuitars:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const guitarObject = {
            name: this.state.name,
            model: this.state.model,
            year: this.state.year,
            price: this.state.price,
            type: this.state.type
        }

        axios.post(`${SERVER_HOST}/guitars`, guitarObject)
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
                    console.log("Record added")
                    this.setState({redirectToDisplayAllGuitars:true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
    }


    render()
    { 
        return (
            <div className="form-container"> 
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}                                            
                    
                <Form>           
                <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="model" value={this.state.model} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" name="type" value={this.state.type} onChange={this.handleChange} />
                    </Form.Group> 
            
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/DisplayAllGuitars"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}