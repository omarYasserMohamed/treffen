import React, { Component } from 'react'
import Navbar1 from './navbar1.component'
import axios from 'axios'
import Navbar3 from './navbar3.component'
import { Link } from 'react-router-dom'


const Meeting = props => (
    <tr>
      <td>{props.meeting.name}</td>
      <td>{props.meeting.description}</td>
      <td>{props.meeting.address}</td>
      <td>{props.meeting.city}</td>
      <td>{props.meeting.date.substring(0,10)}</td>
      <td>{props.meeting.date.substring(11,16)}</td>
      <td>{props.meeting.goingUsers}</td>
      <td>{props.meeting.creatorUsername}</td>

      
      <td>
        <a href="" onClick={() =>{
              console.log(props.userId)
              let meetingid = props.meeting._id
              let id = props.userId

              axios.post("http://localhost:8000/meetings/mindChanged/"+id+"/"+meetingid)
              .then(res => console.log(res))
              .catch(
          err => console.log(err)
        )

              axios.post("http://localhost:8000/users/removeFromGoing/"+id+"/"+meetingid)
              .then(
                
                res => {
                  console.log(res)
                }
              )
              
              
              
              window.location.reload()
        }}>changed your mind</a> | <Link to={"/comments/"+props.userId+"/"+props.meeting._id}>comments</Link> 
      </td>
    </tr>
  )


export default class CreatedMeetings extends Component{
    constructor(props){
        super(props)
        let idPassed = ''
       
        for(let i= window.location.href.length-1 ;i>=0 ;i--){
          if(window.location.href[i] == '/'){
            break
          }
          idPassed = window.location.href[i] + idPassed
        }

        

        this.state = {
             id: idPassed,
             meetings: []

        }

        
       
        
    }

    componentDidMount() {
      
      let mente = []
      let goingto = []
   
      axios.get('http://localhost:8000/users/' + this.state.id)
      .then(res => {
        goingto = res.data.listOfGoingMeetings
      })
      .catch(
      err => console.log(err)
    )

        axios.get('http://localhost:8000/meetings/')
        .then(response => {
            
        
            
          for(let i=0 ; i < response.data.length;i++){
              
              if(goingto.includes(response.data[i]._id)){
                mente.push(response.data[i])          
              }
          }

            console.log(mente)

          this.setState({
              meetings: mente
          })
          
          
        })
        .catch((error) => {
          console.log(error);
        })
        console.log(this.state.meetings)

       
      }
      

    

      meetingsList() {
        
        return this.state.meetings.map(currentmeeting => {
          return <Meeting meeting={currentmeeting} userId={this.state.id} key={currentmeeting._id}/>;
        })
      }


render(){
   
  
    return(
      <div>
        <Navbar3 id = {this.state.id} />
        <div>
        <h4>Meetings you're going to</h4>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>City</th>
              <th>Date</th>
              <th>Time (GMT)</th>
              <th>Participants</th>
              <th>Creator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              
               { this.meetingsList() }
              
          
          </tbody>
        </table>
      </div>
     </div>
    )
}
}