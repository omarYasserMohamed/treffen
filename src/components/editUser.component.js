import React, { Component } from 'react'
import Navbar3 from './navbar3.component'
import axios from 'axios'
import Link from '@material-ui/core/Link';





export default class SignUpForm extends Component{
    constructor(props){
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeCity = this.onChangeCity.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        let idPassed = ''
       
        for(let i= window.location.href.length-1 ;i>=0 ;i--){
          if(window.location.href[i] == '/'){
            break
          }
          idPassed = window.location.href[i] + idPassed
        }

           this.state = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            city:'',
            users: [],
            id:idPassed
        }

        axios.get("http://localhost:8000/users/" + idPassed)
        .then(res => {
            this.setState({
                firstname:res.data.firstName,
                lastname: res.data.lastName,
                city: res.data.city
            })
        })
    }

    

    



    onChangeUsername(e){
        this.setState(
      { username: e.target.value }
    )
    }

    onChangeFirstName(e){
        this.setState(
            {firstname: e.target.value}
        )
    }
    onChangeLastName(e){
        this.setState(
            {lastname: e.target.value}
        )
    }

    onChangeEmail(e){
        
        this.setState(
            {email: e.target.value}
        )
    }

    

    onChangePassword(e){
        this.setState(
      { password: e.target.value }
    )
    }

    onChangeCity(e){
        this.setState(
            {city: e.target.value}
        )
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
           
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            
            city: this.state.city
      
        }
        
        
        axios.post("http://localhost:8000/users/edit/" + this.state.id , user)
        .then(res => window.alert("profile edited"))
        .catch(err => window.alert("something went wrong please try again"))
       
    
       
  } 
render(){
    return(
        <div>
            <Navbar3 id={this.state.id} />
            <div className="container">
            <h3>Edit your Profile</h3>
            <form onSubmit={this.onSubmit}>

            <div className="form-group">
            <label>First Name: </label>
            <input type="text"
            required
             className="form-control" 
            value={this.state.firstname}
            onChange={this.onChangeFirstName} ></input>
            </div>

            <div className="form-group">
            <label>Last Name: </label>
            <input type="text"
            required
             className="form-control" 
            value={this.state.lastname}
            onChange={this.onChangeLastName} ></input>
            </div>


            <div className="form-group">
            <label>City: </label>
            <input type="text"
            required
            id="inputCity"
             className="form-control" 
            value={this.state.city}
            onChange={this.onChangeCity} ></input>
            </div>

            <div className="form-group">
                <input type="submit" className="btm btm-primary" value="submit" />
            </div>

        </form> 
        <Link
             component="button"
             variant="body2"
             onClick={() => {
                this.props.history.push("/changePassword/"+this.state.id)
}}
>
  Change Password?
</Link>
        </div>

        
        <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css" />
        <title>Node File Uploads</title>
        <div className="container">
      
          
          <form action={"http://localhost:8000/upload/"+ this.state.id} method="POST" encType="multipart/form-data">
            <div className="file-field input-field">
              <div className="btn grey">
                <span>new Profile Pic</span>
                <input name="myImage" type="file" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <button type="submit" className="btn">Submit Pic</button>
          </form>
         
         
        </div>
      </div>
           
        </div>
    )
}
}