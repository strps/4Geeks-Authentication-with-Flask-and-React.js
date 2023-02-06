import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [ userInfo, setUserInfo] = useState()

	const navigate = useNavigate()

	useEffect(()=>{
		if(!store.accessToken){
			navigate('/login')
			return
		}
		actions.getProfile().then(data=>setUserInfo(data))
	},[store.accessToken])

	return (
		<div className="container">
			<h1>Perfil</h1>
			<p>User email: {userInfo?.email}</p>
			
		</div>
	);
};
