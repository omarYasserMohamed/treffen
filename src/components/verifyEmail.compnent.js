import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar2 from './navbar2.component'
import PinInput from 'react-pin-input'
import axios from 'axios'

export default class VerifyEmail extends Component {

    constructor(props){
        super(props)
        this.onChangeCode = this.onChangeCode.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            code: ''
        }
    }

    onChangeCode(e){
        
        this.setState(
      { code: e}
    )
    }

    onSubmit(e) {
        let userId = ''
        let userUsername = ''

        for(let i = window.location.href.length-1 ; i >= 0;i--){
            
            
            if(window.location.href[i] == '/'){
                break
            }
                userUsername = window.location.href[i] + userUsername  
            

        } 
        
      
        axios.get("http://localhost:8000/users/")
        .then(
            res => {
                for (var i = 0 ; i < res.data.length;i++){
                    if(res.data[i].username == userUsername){
                        userId = res.data[i]._id
                        break
                    }
    
                }
                axios.post("http://localhost:8000/users/mailVerify/" + userId + "/" + this.state.code)
                .then(res => {
                    
                    if(res.data == 'true' ){
                        this.props.history.push("/login")
                        
                    }
                    else{
                        window.alert("code incorrect")
                    }
                })

            }
        )

  }

    render() {
        const styleInput = {
            position: 'absolute',
            top: 300,   
            left: 600 
          };

          const styleH3 = {
            position: 'absolute',
             
             top:100,
            left: 630 
          };

          const styleH5 = {
            position: 'absolute',
             
            top:225,
            left: 550 
          };

        return(
            <div>
                <Navbar2 />
                <div className="container">
                <h3 style={styleH3}>Verify your Email</h3>
                <div>
                <h5 style={styleH5} >please check your email and enter your 6 digit code</h5>
                
                <PinInput 
                    length={6} 
                    initialValue=""
                    onChange={this.onChangeCode} 
                    type="numeric" 
                    inputMode="number"
                    style={{padding: '10px'}}  
                    inputStyle={{borderColor: 'black'}}
                    inputFocusStyle={{borderColor: 'blue'}}
                    onComplete={this.onSubmit}
                    style={styleInput}
                />

                </div>

                </div>
            </div>
            
        )
  }


}