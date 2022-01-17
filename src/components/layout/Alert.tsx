import React, { Fragment } from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state : RootState) => ({
    alerts: state.alert
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Alert = ({ alerts } : PropsFromRedux) : JSX.Element => {
    return (
        <Fragment>
            {alerts.map(alert => (
                <div key={alert.id} className={`alert bg-${alert.alertType}`}>
                    {alert.msg}
                </div>
            ))}
        </Fragment>
    );
};

export default connector(Alert);
