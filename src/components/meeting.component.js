import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Navbar1 extends Component {

    render() {
        return(
            <tr>
      <td>{this.props.meeting.name}</td>
      <td>{this.props.meeting.description}</td>
      <td>{this.props.meeting.address}</td>
      <td>{this.props.meeting.city}</td>
      <td>{this.props.meeting.date.substring(0,10)}</td>
      <td>{this.props.meeting.date.substring(11,16)}</td>
      <td>{this.props.meeting.goingUsers}</td>
      <td>{this.props.meeting.creatorUsername}</td>

      
      <td>
        <a href="" onClick={() =>{
              let meetingid = this.props.meeting._id
              let id = this.props.userId

              
              axios.post("http://localhost:8000/meetings/going/"+id+"/"+meetingid)
              .then(res => 
                    {
                      console.log(res.data)
                    
                      this.props.history.push("/goingMeeting"+meetingid)
                    }
                )
                .catch(err =>{
                  console.log(err)
                      
                })

                
              axios.post("http://localhost:8000/users/addToGoing/"+id+"/"+meetingid)
              .then(
                
                res => {
                 
                  
                  console.log(res)
                  
                }
              )
              .catch(err => {
                console.log(err)
               
              })

            

                

            
              
              
              
        }}>participate</a> | <Link to={"/comments/"+ this.props.userId+"/"+this.props.meeting._id}>comments</Link> 
      </td>
    </tr>
        )
  }


}