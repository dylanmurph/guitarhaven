import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import GuitarTable from "./GuitarTable"
import {SERVER_HOST} from "../../config/global_constants"
import "../../css/table.css"


export default class DisplayAllGuitars extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            guitars:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/guitars`)
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

  
    render() 
    {   
        return (
            <div className="table-container">
                <div>
                    <GuitarTable guitars={this.state.guitars} /> 

                    <div className="submit-container">
                        <Link className="button" to={"/AddGuitar"}>Add New Guitar</Link>
                    </div>
                </div>
            </div>
        )
    }
}