import React, { Component } from 'react'
import Navbar1 from './navbar1.component'
import axios from 'axios'
import Navbar3 from './navbar3.component'
import { Link } from 'react-router-dom'
import Meeting from "./meeting.component"


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
              
              if(goingto.includes(response.data[i]._id) == false){
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
        <h4>Meetings you ain't participating in (world-wide)</h4>
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