import React, { Component } from 'react'
import Navbar3 from './navbar3.component'
import axios from 'axios'






export default class SignUpForm extends Component{
    constructor(props){
        super(props)
       this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
       this.onChangeOldPassword = this.onChangeOldPassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        let idPassed = ''
       
        for(let i= window.location.href.length-1 ;i>=0 ;i--){
          if(window.location.href[i] == '/'){
            break
          }
          idPassed = window.location.href[i] + idPassed
        }



           this.state = {
            oldPassword: "",
            newPassword: "",
            username:"",
            id:idPassed
        }

        axios.get('http://localhost:8000/users/' + this.state.id)
        .then(res => {
                this.setState({
                    username:res.data.username
                })
        })

    }

    

    



    onChangeOldPassword(e){
        this.setState(
      {oldPassword: e.target.value }
    )
    }

    onChangeNewPassword(e){
        this.setState(
            {newPassword: e.target.value}
        )
    }
    

  
    

    

    

    onSubmit(e) {
        e.preventDefault()

        axios.get("http://localhost:8000/users/check/"+this.state.id+"/" + this.state.oldPassword)
        .then(res => {
            if(res.data == this.state.username){
                const b = {
                    password: this.state.newPassword
                }
                axios.post("http://localhost:8000/users/changePassword/"+this.state.id , b )
                .then(res => 
                    {window.alert(res.data)
                        this.props.history.push('/profile/' + this.state.id)
                })
                .catch(err => {
                    console.log(err)
                    window.alert("something went wrong please try again")
                })
            }
            else{
                window.alert("wrong current password")
            }

        })

        
       
    
       
  } 
render(){
    return(
        <div>
            <Navbar3 id={this.state.id} />
            <div className="container">
            <h3>Change Password</h3>
            <form onSubmit={this.onSubmit}>

            <div className="form-group">
            <label>Current Password: </label>
            <input type="password"
            required
             className="form-control" 
            value={this.state.oldPassword}
            onChange={this.onChangeOldPassword} ></input>
            </div>

            <div className="form-group">
            <label>New Password: </label>
            <input type="password"
            required
             className="form-control" 
            value={this.state.newPassword}
            onChange={this.onChangeNewPassword} ></input>
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