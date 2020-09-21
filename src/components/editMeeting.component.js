import React, { Component } from 'react'
import Navbar3 from './navbar3.component'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"






export default class CreateMeeting extends Component{
    constructor(props){
        super(props)
        this.onChangeMeetingsName = this.onChangeMeetingsName.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)    
        
        let userId = ''
        let flag = false
        let meetingId=''

        for(let i = window.location.href.length-1; i>0 ; i--){
            if(window.location.href[i] == '/'){
                break
            }
            meetingId  = window.location.href[i] + meetingId
        }

        for(let i = window.location.href.length-1; i>0 ; i--){
            if(window.location.href[i] == '/' && flag == true){
                break
            }
            
            if(flag){
            userId = window.location.href[i] + userId
            }
            if(window.location.href[i] == '/' && flag == false){
                flag = true
            }
        }

        this.state = {
            name: '',
            description: '',
            creatorUsername: '',
            goingUsers: [],
            address: '',
            city: '',
            date: new Date(),
            id: userId ,
            meetingid: meetingId
 
         }

        axios.get('http://localhost:8000/meetings/' + meetingId)
        .then((res) => {
            this.setState({
                
                    name: res.data.name,
                    description: res.data.description,
                    creatorUsername: res.data.creatorUsername,
                    goingUsers: res.data.goingUsers,
                    address: res.data.address,
                    city: res.data.city,
                    date: new Date(),
                    
         
                 
            })
        })
        .catch((err) => console.log(err))

           
    }

    

    



    onChangeMeetingsName(e){
        this.setState(
      { name: e.target.value }
    )
    }

    onChangeDescription(e){
        this.setState(
            {description: e.target.value}
        )
    }
    onChangeAddress(e){
        this.setState(
            {address: e.target.value}
        )
    }

    onChangeDate(date){
        this.setState(
          { date: date }
        )
    }
    onSubmit(e) {
        e.preventDefault()

        

        axios.get("http://localhost:8000/users/" + this.state.id)
        .then(res => {
            this.setState(
                { city: res.data.city,
                  creatorUsername: res.data.username,
                 
                    
                }
              )
        })
        .catch(err => console.log(err))

        const meeting = {
            name: this.state.name,
            description: this.state.description,
            creatorUsername: this.state.creatorUsername,
            goingUsers: this.state.goingUsers,
            address: this.state.address,
            city: this.state.city,
            date: this.state.date,
            
        }

        
        axios.post('http://localhost:8000/meetings/edit/'+ this.state.meetingid , meeting)
        .then(res => {
            console.log(res)
           


            axios.post('http://localhost:8000/users/create/' + this.state.id , res.data)
            .then(res => {console.log(res)
                window.alert("meeting's data changed")
                this.props.history.push("/createdMeeting/"+this.state.id) 
            }
            )
            

            

        })
        .catch(
      err =>{ console.log(err)
        window.alert("something went wrong please try again")
      }
    )

  
    
           
        
       
       
  } 
render(){
    return(
       
        <div>
        <Navbar3  id= {this.state.id}/>
        <div className="container">
        <h3>Edit Meeting</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <label>Meeting's name: </label>
        <input type="text"
        required
         className="form-control" 
        value={this.state.name}
        onChange={this.onChangeMeetingsName} ></input>
        </div>

        <div className="form-group">
        <label>Meeting's Description: </label>
        <input type="text"
        required
         className="form-control" 
        value={this.state.description}
        onChange={this.onChangeDescription} ></input>
        </div>

        <div className="form-group">
        <label>Address: </label>
        <input type="text"
        required
         className="form-control" 
        value={this.state.address}
        onChange={this.onChangeAddress} ></input>
        </div>

        
        <div className="form-group">
                        <label>Date and Time (GMT): </label>
                        <div>
                            <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            showTimeSelect

                            />
                        </div>
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