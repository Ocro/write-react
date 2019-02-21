import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { LOGIN_MUTATION } from "../gqlqueries/user";
import { AUTH_TOKEN } from '../constants'


class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    render() {
        const { username, password } = this.state
        return (
            <div>
                <h1 className="center-align">Write</h1>

                    <Mutation
                        mutation={LOGIN_MUTATION}
                        variables={{username, password}}
                        onCompleted={data => this._confirm(data)}
                    >
                        {(mutation, { loading, error }) => (
                            <div className="login-form z-depth-3">
                                {
                                    !loading && !error &&
                                    <h5>Sign in</h5>
                                }
                                {
                                    loading &&
                                    <div className="preloader-wrapper small active">
                                        <div className="spinner-layer spinner-blue-only">
                                            <div className="circle-clipper left">
                                                <div className="circle"></div>
                                            </div>
                                            <div className="gap-patch">
                                                <div className="circle"></div>
                                            </div>
                                            <div className="circle-clipper right">
                                                <div className="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    error &&
                                    <p className="red-text">Unable to login<br />Please verify your informations</p>
                                }
                                <form onSubmit={e => {
                                    e.preventDefault()
                                    mutation()
                                }}>
                                    <div className="input-field">
                                        <input value={username}
                                               onChange={e => this.setState({username: e.target.value})}
                                               type="text"
                                               id="username"
                                        />
                                        <label for="username">Username</label>
                                    </div>
                                    <div className="input-field">
                                        <input value={password}
                                               onChange={e => this.setState({password: e.target.value})}
                                               type="password"
                                               id="password"
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <button className="btn waves-effect waves-light" type="submit">
                                        Login
                                        <i className="material-icons left">person</i>
                                    </button>
                                </form>
                            </div>
                        )}
                    </Mutation>
            </div>
        )
    }

    _confirm = async data => {
        this._saveUserData(data.login.token)
        this.props.history.push(`/`)
    }

    _saveUserData = token => {
        // TODO: Not secure, use cookie (well configured) instead.
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default Login