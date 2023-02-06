import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Logout = () => {
	const { store, actions } = useContext(Context);
	const [msg, setMsg] = useState('Cerrando Sesion')


	useEffect(() => {
		actions.logout().then(resp => setMsg(resp ? 'Sesion cerrada' : 'Error al cerrar la session!'))
	}, [])

	return (
		<div className="container">
			<h1>Cierre de Sesion</h1>
			<p>{msg}</p>
		</div>
	);
};
