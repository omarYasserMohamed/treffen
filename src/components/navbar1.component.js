import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar1 extends Component {

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Treffen</Link>
                <div >
                <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                        <Link to="/login" className="nav-link">login</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/register" className="nav-link">sign up</Link>
                    </li>
                    
                </ul>
                </div>
            </nav> 
        )
  }


}