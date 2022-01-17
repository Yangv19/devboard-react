import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/basic/Landing";
import Auth from "./components/routing/Auth";

const App  = () : JSX.Element => {
	useEffect(() => {
		if (localStorage.token) {
			axios.defaults.headers.common["x-auth-token"] = localStorage.token;
			store.dispatch(loadUser());
		};
	}, []);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar/>
				<Switch>
					<Route exact path="/" component={Landing}/>
					<Route exact path="/*" component={Auth}/>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
