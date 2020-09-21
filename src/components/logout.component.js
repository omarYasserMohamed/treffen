import React, { Component } from 'react'
import Navbar1 from './navbar1.component'
import axios from 'axios'
import Navbar3 from './navbar3.component'
import Navbar2 from './navbar2.component'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'


export default class Profile extends Component{
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
             id: idPassed

        }
    }

    
  
   
render(){
    return(
      <div>
        <Navbar3 id = {this.state.id} />
        <div>
            <h2 style={{
                position: 'absolute',
                top:130,
                left: 550 

                }}>Log Out of Treffen?</h2>

            <ButtonGroup style={{
                position: 'absolute',
                top:180,
                left: 600 

                }} size="large"  aria-label="large outlined primary button group">
                <Button onClick={() =>{
                    this.setState(
                  { id: undefined }
                )
                this.props.history.push('/login')

                }}>Yes</Button>
                
                <Button  color="secondary" onClick={() => {

                    this.props.history.push("/profile/"+this.state.id)
                }}>No</Button>
                
            </ButtonGroup>


        </div>
     </div>
    )
}
}