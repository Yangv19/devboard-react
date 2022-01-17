import { Route, Switch } from "react-router-dom";
import EditProfile from "../auth/EditProfile";
import NotFound from "../basic/NotFound";

const AuthRoutes = () : JSX.Element => {
    return (
        <Switch>
            <Route exact path="/edit-profile" component={EditProfile}/>
            <Route exact path ="/*" component={NotFound}/>
        </Switch>
    );
};

export default AuthRoutes;
