import React from "react"
import { Route, Switch } from "react-router-dom";
import NotAuthorized from "../basic/NotAuthorized";
import NotFound from "../basic/NotFound";

const GuestRoutes = () : JSX.Element => {
    return (
        <Switch>
            <Route exact path="/edit-profile" component={NotAuthorized}/>
            <Route exact path ="/*" component={NotFound}/>
        </Switch>
    );
};

export default GuestRoutes;
