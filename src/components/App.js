import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../styles/App.css'
import Login from './Login'
import ArticlesView from "./ArticlesView"

class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={ArticlesView} />
                    <Route exact path="/article/:id" component={ArticlesView} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </div>
        )
    }
}

export default App
