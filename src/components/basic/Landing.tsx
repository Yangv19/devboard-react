import { Fragment } from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import Alert from "../layout/Alert";
import Footer from "../layout/Footer";

const mapStateToProps = (state : RootState) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Landing = ({ isAuthenticated } : PropsFromRedux) : JSX.Element => {
    const guestLinks = (
        <div>
            <Link to="/register" className="btn light bg-primary">Sign Up</Link>
            <Link to="/login" className="btn primary bg-light">Login</Link>
        </div>
    );

    return (
        <Fragment>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <Alert/>
                        <h1 className="x-large">Developer Board</h1>
                        <p className="lead">
                            Start sharing issues, having discussions, and working collaboratively now
                        </p>
                        {!isAuthenticated && guestLinks}
                    </div>
                </div>
            </section>
            <Footer/>
        </Fragment>
    );
};

export default connector(Landing);
