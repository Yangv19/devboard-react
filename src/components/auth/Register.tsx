import React, { Fragment, useState, useEffect } from "react"
import { History, LocationState } from "history";
import { Link } from "react-router-dom";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Footer from "../layout/Footer";

const mapStateToProps = (state : RootState) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatch = {
    setAlert,
    register
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    history: History<LocationState>
}

const Register = ({ setAlert, register, isAuthenticated, history } : Props) : JSX.Element => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    });

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        };
    }, [isAuthenticated, history]);
    
    const { username, email, password, password2 } = formData;

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name] : e.target.value});

    const onSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Password do not match", "danger");
        } else {
            register({username, email, password});
        }
    };

    return (
        <Fragment>
            <section className="container">
                <h1 className="large primary">Sign Up</h1>
                <p className="lead">
                    <i className="fas fa-user"/>
                    <span className="hide-mobile"> Create Your Account</span>
                </p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            name="username" 
                            value={username} 
                            onChange={e => onChange(e)}
                        />
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn light bg-primary" value="Register" />
                </form>
                <div className="my-1">
                    <p>
                        Already have an account?
                    </p>
                    <Link to="/login">Sign In</Link>
                </div>
            </section>
            <Footer/>
        </Fragment>
    );
};

export default connector(Register);
