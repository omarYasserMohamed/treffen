import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar2 extends Component {

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link  className="navbar-brand">Treffen</Link>
                
            </nav> 
        )
  }


}