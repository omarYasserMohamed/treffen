import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';

export default class Navbar3 extends Component {
    constructor(props){
        super(props)
        const id = this.props.id
    }

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link className="navbar-brand">Treffen</Link>
                <div >
                <ul className="navbar-nav mr-auto">
                
                <li className="navbar-item">
                        <Link to={"/profile/"+ this.props.id} className="nav-link"><AccountBoxIcon style={{color:"white"}} fontSize="large"/></Link>
                    </li>

                   <li className="navbar-item">
                        <Link to= {"/createMeeting/" + this.props.id} className="nav-link"><AddBoxIcon style={{color:"white"}} fontSize="large"/></Link>
                    </li>
                    
                    <li className="navbar-item">
                        <Link to={"/cityMeeting/" + this.props.id} className="nav-link"><LocationCityIcon style={{color:"white"}} fontSize="large"></LocationCityIcon></Link>
                    </li>
                    
                    <li className="navbar-item">
                        <Link to={"/worldMeeting/" + this.props.id} className="nav-link"><PublicIcon style={{color:"white"}} fontSize="large"/></Link>
                    </li>
                    
                    <li className="navbar-item">
                        <Link to={"/goingMeeting/" + this.props.id} className="nav-link"><DirectionsRunIcon style={{color:"white"}} fontSize="large"/></Link>
                    </li>

                    <li className="navbar-item">
                        <Link to={"/createdMeeting/" + this.props.id} className="nav-link"><LocalActivityIcon style={{color:"white"}} fontSize="large"/></Link>
                    </li>

                    <li className="navbar-item">
                       <Link to={"/logOut/" + this.props.id} className="nav-link" ><ExitToAppIcon style={{color:"white"}} fontSize="large"></ExitToAppIcon></Link> 
                    </li>
                    
                </ul>
                </div>
            </nav> 
        )
  }


}