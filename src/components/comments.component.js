import React, { Component } from 'react'
import Navbar3 from './navbar3.component'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Comment from "./comment.component"





export default class Comments extends Component{
    constructor(props){
        super(props)
        
        this.onChangeComment = this.onChangeComment.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.commentsList = this.commentsList.bind(this)

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
            id: userId ,
            meetingid: meetingId,
            comment: "",
            user: "",
            comments:[]
            
 
         }



        axios.get('http://localhost:8000/users/' + userId)
        .then((res) => {
            this.setState({
                
                user: res.data.username
                    
         
                 
            })
        })
        .catch((err) => console.log(err))

        axios.get('http://localhost:8000/meetings/' + meetingId)
        .then((res) => {
            this.setState({
                
                comments: res.data.comments
                    
         
                 
            })
        })
        .catch((err) => console.log(err))

           
    }

    
    onChangeComment(e){
        this.setState(
            {comment: e.target.value}
        )
    }
    
    onSubmit(e) {
        e.preventDefault()
        const b = {
            username: this.state.user,
            comment: this.state.comment
        }
        axios.post('http://localhost:8000/meetings/comment/'+this.state.meetingid , b)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        this.setState({comment:""})
        
        window.location.reload()


    }

    commentsList() {
        
        return this.state.comments.map(currentcomment => {
          return <Comment comment={currentcomment}/>;
        })
      }

      

render(){
    return(
        
        <div>
        <Navbar3  id= {this.state.id}/>
       
       
        <form onSubmit={this.onSubmit}>
        <div className="container">
        <div className="form-group">
        <input type="text"
        required
         className="form-control" 
        value={this.state.comment}
        onChange={this.onChangeComment} 
        placeholder="add a comment"
        style={{position:"abstract" , top:"100px" , left:"200px"}}
        ></input> 
        
       
        
        </div>
        
       
        </div>
        <div className="form-group">
            <input type="submit" className="btm btm-primary" value="comment" style={{position:"absolute" , top:"72px" , left:"1260px"}} />
        </div>

    </form> 


    <div className="container">
    <table className="table">
          <thead className="thead-light">
            <tr>
              <th>comments</th>
            
            </tr>
          </thead>
          <tbody>
              
               { this.commentsList() }
              
          
          </tbody>
        </table>
        </div>
      
    </div>
        
    )
}
}