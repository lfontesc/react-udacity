import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {

        render(){
            return(
                <div>
                    <center><h2>Page Not Found :X</h2></center>
                    <br/>
                    <center><h2>Go To Home</h2>
                        <Link className='close-create-contact' to='/'>
                            <button className="close-search">Close</button>
                        </Link>
                    </center>
                </div> 
            )
        }
    }


export default NotFound