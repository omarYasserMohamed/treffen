import React, { Component } from 'react'
import Navbar1 from './navbar1.component'
import axios from 'axios'






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

           this.state = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            city:'',
            users: []

        }
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
            username: this.state.username,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            city: this.state.city
      
        }
        
        

let flag = false
        
axios.get("http://localhost:8000/users/")
.then(
        res => {
            for (var i = 0 ; i < res.data.length;i++){
                if(user.username.localeCompare(res.data[i].username) == 0){
                    window.alert('USERNAME ALREADY EXIST')
                    flag = true
                    break
                }
                if(user.email.localeCompare(res.data[i].email) == 0){
                    window.alert('EMAIL ALREADY EXIST')
                    flag = true
                    break
                }

            }
            if(flag == false){
               

                
                this.props.history.push("/verifyEmail/" + user.username)
            axios.post("http://localhost:8000/users/add", user)
            .then(res => console.log(res))
            
        }
        }
)

        
       
        this.setState(
      { username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        city:''
    }
    )
  } 
render(){
    return(
        <div>
            <Navbar1 />
            <div className="container">
            <h3>Sign Up</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label>Username: </label>
            <input type="text"
            required
             className="form-control" 
            value={this.state.username}
            onChange={this.onChangeUsername} ></input>
            </div>

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
            <label>Email: </label>
            <input type="email"
            required
             className="form-control" 
            value={this.state.email}
            onChange={this.onChangeEmail} ></input>
            </div>

            <div className="form-group">
            <label>Password: </label>
            <input type="password"
            required
             className="form-control" 
            value={this.state.password}
            onChange={this.onChangePassword} ></input>
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
        </div>   
        </div>
    )
}
}