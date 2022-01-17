import React, { Fragment, useState, useEffect } from "react"
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { login } from "../../actions/auth";
import { History, LocationState } from "history";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";

const mapStateToProps = (state : RootState) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatch = {
    login
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    history: History<LocationState>
};

const Login = ({ login, isAuthenticated, history } : Props) : JSX.Element => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        };
    }, [isAuthenticated, history]);
    
    const { email, password } = formData;

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name] : e.target.value});

    const onSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <Fragment>
            <section className="container">
                <h1 className="large primary">Sign In</h1>
                <p className="lead">
                    <i className="fas fa-user"/>
                    <span className="hide-mobile"> Sign Into Your Account</span>
                </p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Email Address" 
                            name="email" 
                            value={email} 
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn light bg-primary" value="Login" />
                </form>
                <div className="my-1">
                    <p>
                        Don"t have an account?
                    </p>
                    <Link to="/register">Sign Up</Link>
                </div>
            </section>
            <Footer/>
        </Fragment>
    );
};

export default connector(Login);
