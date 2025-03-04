import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import UserTable from "./UserTable"
import {SERVER_HOST} from "../../config/global_constants"


export default class DisplayAllUsers extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            users:[]
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

  
    render() 
    {   
        return (           
            <div className="table-container">
                <div className="table">
                    <UserTable users={this.state.users} /> 

                    <div className="submit-container">
                        <Link className="submit-button" to={"/AddUser"}>Add New User</Link>
                    </div>
                </div>
            </div> 
        )
    }
}