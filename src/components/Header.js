import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { isUserLogged } from '../utils'

class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/">home</Link><br />
                {isUserLogged() ? '' : <Link to="/login">login</Link>}
            </div>
        )
    }
}

export default withRouter(Header)