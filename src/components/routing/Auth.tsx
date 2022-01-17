import { Fragment } from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Alert from "../layout/Alert";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import AuthRoutes from "./AuthRoutes";
import GuestRoutes from "./GuestRoutes";

const mapStateToProps = (state : RootState) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Auth = ({ isAuthenticated } : PropsFromRedux) : JSX.Element => {
    return (
        <Fragment>
            <Alert/>
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/posts" component={Posts}/>
                <Route exact path="/posts/:id" component={Post}/>
                {isAuthenticated ? 
                    <AuthRoutes/> : <GuestRoutes/>
                }
            </Switch>
        </Fragment>
    );
};

export default connector(Auth);
