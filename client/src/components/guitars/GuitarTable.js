import React, {Component} from "react"
import GuitarTableRow from "./GuitarTableRow"

export default class GuitarTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.guitars.map((guitar) => <GuitarTableRow key={guitar._id} guitar={guitar}/>)}
                </tbody>
            </table>      
        )
    }
}