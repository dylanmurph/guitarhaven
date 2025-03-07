import React, {Component} from "react"
import UserTableRow from "./UserTableRow"


export default class UserTable extends Component 
{
    render() 
    {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address Line 1</th>
                        <th>Address Line 2</th>
                        <th>County</th>
                        <th>Phone No.</th>
                        <th>Access Level</th>
                        <th>Profile Picture</th>
                        <th></th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.users.map((user) => <UserTableRow key={user._id} user={user}/>)}
                </tbody>
            </table>      
        )
    }
}