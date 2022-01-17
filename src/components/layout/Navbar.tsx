import { Fragment } from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";

const mapStateToProps = (state : RootState) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatch = {
    logout
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Navbar = ({ logout, isAuthenticated } : PropsFromRedux) : JSX.Element => {
    const authLinks = (
		<Fragment>
			<li>
				<Link to="/edit-profile">
					<i className="fas fa-user"/>
					<span className="hide-mobile"> Profile</span>
				</Link> 
			</li>
			<li>
				<Link onClick={e => logout()} to="/">
					<i className="fas fa-sign-out-alt"/>
					<span className="hide-mobile"> Logout</span>
				</Link>
			</li>
		</Fragment>
    );

    const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">
					<i className="fas fa-plus"></i>
					<span className="hide-mobile"> Register</span>
				</Link>
			</li>
			<li>
				<Link to="/login">
					<i className="fas fa-sign-in-alt"></i>
					<span className="hide-mobile"> Login</span>
				</Link>
			</li>
		</Fragment>    	
    );

    return (
      <nav className="navbar bg-dark">
        <h1>
        	<Link to="/">
            	<i className="fas fa-file-code"/>
            	<span className="hide-mobile"> DevBoard</span>
          	</Link>
		</h1>
		<ul>
			<li>
				<Link to="/posts">
					<i className="fas fa-comment-alt"></i>
					<span className="hide-mobile"> Posts</span>
				</Link> 
			</li>
			{isAuthenticated ? authLinks : guestLinks}
		</ul>
      </nav>
    );
};

export default connector(Navbar);
