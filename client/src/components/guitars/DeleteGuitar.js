import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from "../../config/global_constants"

export default class DeleteGuitar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            redirectToDisplayAllGuitars:false
        }
    }

    componentDidMount()
    {
        axios.delete(`${SERVER_HOST}/guitars/${this.props.match.params.id}`)
        .then(res =>
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)
                }
                else // success
                {
                    console.log("Record deleted")
                }
                this.setState({redirectToDisplayAllGuitars:true})
            }
            else
            {
                console.log("Record not deleted")
            }
        })
    }

    render()
    {
        return (
            <div>
                {this.state.redirectToDisplayAllGuitars ? <Redirect to="/DisplayAllGuitars"/> : null}
            </div>
        )
    }
}