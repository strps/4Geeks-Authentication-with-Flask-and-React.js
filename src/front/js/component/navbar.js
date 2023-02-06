import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link className="mr-1" to={store.accessToken?"/profile":'/signup'}>
						<button className="btn btn-primary">{store.accessToken?"Profile":'Sign up'}</button>
					</Link>
					<Link to={store.accessToken?"/logout":'/login'}>
						<button className="btn btn-primary">{store.accessToken?"Log out":'Log in'}</button>
					</Link>

				</div>
			</div>
		</nav>
	);
};
