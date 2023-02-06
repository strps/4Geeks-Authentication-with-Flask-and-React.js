import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";

export const Login = props => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const navigate = useNavigate()
	useEffect(()=>{
		if(store.accessToken){
			navigate('/profile')
		}

	},[store.accessToken])

	async function submitLogin (e){
		e.preventDefault()
		let resp = await actions.login(email, password)
	}

	return (
		<div className="container text-center">
			<h1>LOG IN</h1>
			<form>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)}/>
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
				</div>
				<button type="submit" className="btn btn-primary" onClick={(e)=>submitLogin(e)}>Submit</button>
			</form>

		</div>
	);
};

