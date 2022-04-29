import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Settings from './private/Settings/Settings';
import Login from './public/Login/Login';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact>
                <Login />
            </Route>
            <Route path="/settings">
                <Settings />
            </Route>
        </BrowserRouter>
    )
}

export default Routes;