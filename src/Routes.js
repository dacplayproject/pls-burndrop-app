import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {asyncComponent} from "./components/AsyncComponent";
import { createHashHistory} from "history";
const AsyncHome = asyncComponent(import("./page/Home"));
const AsyncNotFound = asyncComponent(import("./page/NotFound"));

const history = createHashHistory();


export default () =>
    <Router history={history}>
        <Switch>
            <Route
                exact
                component={AsyncHome}
                path='/'
            />

            <Route component={AsyncNotFound}/>
        </Switch>
    </Router>
