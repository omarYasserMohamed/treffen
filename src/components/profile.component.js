import React, { Component } from 'react'
import Navbar1 from './navbar1.component'
import axios from 'axios'
import Navbar3 from './navbar3.component'
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import ImageUploader from 'react-images-upload';



export default class Profile extends Component{
    constructor(props){
        super(props)
        this.onDrop = this.onDrop.bind(this);
        let idPassed = ''
       
        for(let i= window.location.href.length-1 ;i>=0 ;i--){
          if(window.location.href[i] == '/'){
            break
          }
          idPassed = window.location.href[i] + idPassed
        }
        this.state = {
          id: idPassed,
          username:'',
          firstname:'',
          lastname:'',
          city:'',
          email:'',
          userSince: '',
          numberOfCreated: 0,
          picture: ""
          

     }
        
        axios.get('http://localhost:8000/users/' + idPassed)
        .then(res => {
            
          this.setState({
              username:res.data.username,
              firstname:res.data.firstName,
             lastname: res.data.lastName,
             city:res.data.city,
             email: res.data.email,
             userSince: res.data.createdAt.substring(0,10),
             numberOfCreated: res.data.listOfCreatedMeetings.length,
             
            
            })
            if(res.data.profilePic != undefined){
              this.setState({
                picture: require('../images/' + res.data.profilePic)
              })
              
            }
            
        })

        

    }

    
    onDrop(picture) {
      this.setState({
        picture: picture
      })

      const body = {
        file: this.state.pictures
      
      }
      axios.post('http://localhost:8000/users/upload/'+this.state.id , body)
      window.alert(picture)

  }

render(){
    
    return(
      <div>
        <Navbar3 id = {this.state.id} />
        <div>
          <Avatar variant='square' src={this.state.picture}
              style={ { 
                  color: 'black',
                  background: 'black',
                  height:'150px',
                  width: '800px', 
                  position: 'absolute',
                  left:'300px',
                  top:'67px'
              }}
              
          ></Avatar>

          <Avatar 
         src={this.state.picture}
          style={ {  
            height:'120px',
            width: '120px',
            position: 'absolute',
            left:'640px',
            top:'150px'

           }}></Avatar>
           
           <h3 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '64vh'}}>{this.state.username}</h3>

        </div>
        <div>
          
          <Link to={"/editUser/" + this.state.id} className="nav-link"><EditIcon style={{position: 'absolute',left:'900px',top:'320px'}} /></Link>
          <h5 style={{position: 'absolute',left:'300px',top:'320px'}} >Firstname: {this.state.firstname}</h5>
          <h5 style={{position: 'absolute',left:'300px',top:'360px'}} >Lastname: {this.state.lastname}</h5>
          <h5 style={{position: 'absolute',left:'300px',top:'400px'}} >Email: {this.state.email}</h5>
          <h5 style={{position: 'absolute',left:'300px',top:'440px'}} >City: {this.state.city}</h5>
          <h5 style={{position: 'absolute',left:'300px',top:'480px'}} >Using Treffen since: {this.state.userSince}</h5>
          <h5 style={{position: 'absolute',left:'300px',top:'520px'}} >Number of Meetings Created: {this.state.numberOfCreated}</h5>
        </div>



            
     </div>
    )
}
}