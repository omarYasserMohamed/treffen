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

        for(let i = window.location.href.length-1; i>0 ; i--){
            if(window.location.href[i] == '/'){
                break
            }
            userId = window.location.href[i] + userId
        }

           this.state = {
           name: '',
           description: '',
           creatorUsername: '',
           goingUsers: [],
           address: '',
           city: '',
           date: new Date(),
           id: userId 

        }
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

        
        axios.post('http://localhost:8000/meetings/add' , meeting)
        .then(res => {
            console.log(res)
            window.alert("meeting created")


            axios.post('http://localhost:8000/users/create/' + this.state.id , res.data)
            .then(res => console.log(res))

            

        })
        .catch(
      err =>{ console.log(err)
        window.alert("something went wrong please try again")
      }
    )

  
    
           
        
       
        this.setState(
      { 
        name: '',
        description: '',
        creatorUsername: '',
        goingUsers: [],
        address: '',
        city: '',
        date: new Date(),
        

    }
    )
  } 
render(){
    return(
       
        <div>
        <Navbar3  id= {this.state.id}/>
        <div className="container">
        <h3>Create Meeting</h3>
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