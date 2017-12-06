import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Project from './components/Project/Project';
import Viewer from './components/Viewer/Viewer';
import './App.css';

class App extends Component {

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path="/" component={Project} />
                    <Route path="/view/:id/:itemIndex?" component={Viewer} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
