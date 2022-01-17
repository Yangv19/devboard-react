import React, { Fragment } from "react";
import Footer from "../layout/Footer";

const NotFound = () : JSX.Element => {
    return (
        <Fragment>
            <section className="container full">
                <h1 className="large text-primary">
                    <i className="fas fa-exclamation-triangle"/>
                    <span> 404 Page Not Found</span>
                </h1>
                <p className="lead">Sorry this page does not exist</p>
            </section>
            <Footer/>
        </Fragment>
    );
};

export default NotFound;
