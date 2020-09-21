import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Navbar1 extends Component {

    render() {
        return(
            <tr>
      <td>{this.props.comment}</td>
    </tr>
        )
  }


}