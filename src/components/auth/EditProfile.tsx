import React, { Fragment, useState } from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { History, LocationState } from "history";
import { deleteAccount, updateAccount } from "../../actions/auth";
import Footer from "../layout/Footer";

const mapStateToProps = (state : RootState) => ({
    user: state.auth.user
});

const mapDispatch = {
    deleteAccount, 
    updateAccount
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    history: History<LocationState>
};

const EditProfile = ({ deleteAccount, updateAccount, history, user } : Props) : JSX.Element => {
    const [img, setImg] = useState<null | Blob>(null);

    const onChange = (e : any) => setImg(e.target.files[0]);
    
    const onSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault();
        updateAccount(img);
    };

    return (
        <Fragment>
            <section className="container">
                <h1 className="large primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user">Welcome {user.username}</i>
                </p>
                <img
                    className="round-img"
                    src={`data:image/png;base64, ${user.avatar}`}
                    alt=""
                />
                <div>
                    <button className="btn bg-danger w-15" onClick={e => {
                                                                deleteAccount()
                                                                history.push("/")}}>
                        <i className="fas fa-user-minus"/> Delete My Account
                    </button>
                    <form className="my-1" onSubmit={e => onSubmit(e)}>
                        <input className="btn bg-success w-15" type="file" name="img" onChange={e => onChange(e)}/>
                        <div className="my-1">
                            <input className="btn bg-success w-15" type="submit" value="Change profile"/>
                        </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </Fragment>
    );
};

export default connector(EditProfile);
