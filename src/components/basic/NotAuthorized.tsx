import { Fragment } from "react";
import Footer from "../layout/Footer";

const NotAuthorized = () : JSX.Element => {
    return (
        <Fragment>
            <section className="container full">
                <h1 className="large text-primary">
                    <i className="fas fa-skull-crossbones"/>
                    <span> 401 Not Authorized</span>
                </h1>
                <p className="lead">Sorry you are not authorized to view this page</p>
            </section>
            <Footer/>
        </Fragment>
    );
};

export default NotAuthorized;
