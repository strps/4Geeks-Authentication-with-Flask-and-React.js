import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";

export const Signup = props => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [signedup, setSignedup] = useState(false)
	const [msg, setMsg] = useState([])



	async function submitSignup(e) {
		e.preventDefault()
		let resp = await actions.signup(email, password)
		console.log(resp)
		if(resp === 'email already in use'){
			setMsg(<p className='text-danger'>This email already exist, please try another one.</p>)
			return
		}else {
			setSignedup(true)
		}
	}

	return (
		<div className="container text-center">
			<h1>SIGN UP</h1>
			{signedup ?
				<>
					<h2>Sign up successful</h2>
					<p>You can access with your email and password</p>
				</>
				:
				<form>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
						<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
						{msg}
						<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button type="submit" className="btn btn-primary" onClick={(e) => submitSignup(e)}>Submit</button>
				</form>
			}

		</div>
	);
};

