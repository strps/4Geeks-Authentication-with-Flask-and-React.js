const apiUrl = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			loadTokens: () => {
				let accessToken = localStorage.getItem('accessToken')
				let refreshToken = localStorage.getItem('refreshToken')
				setStore({ refreshToken: refreshToken, accessToken: accessToken })
			},

			login: async (email, password) => {
				const resp = await fetch(apiUrl + '/api/login', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				if (!resp.ok) {
					return resp.statusText
				}
				const data = await resp.json()
				setStore({ refreshToken: data.refreshToken, accessToken: data.accessToken })
				localStorage.setItem("accessToken", data.accessToken)
				localStorage.setItem("refreshToken", data.refreshToken)
				return true
			},

			logout : async()=>{
				let resp = await fetch(apiUrl+"/api/logout", {
					method : 'POST',
					headers : {
						...getActions().getAuthHeader()
					}
				})
				if(!resp.ok){
					console.error('There was an error at closing session:'+resp.statusText)
					return false
				}
				localStorage.removeItem("accessToken")
				localStorage.removeItem("refreshToken")
				setStore({ refreshToken: null, accessToken: null })
				return true
			},

			getAuthHeader: ()=>{
				return {
					"Authorization" : 'Bearer '+ getStore().accessToken
				}
			},

			getProfile: async()=>{
				let resp = await fetch(apiUrl+'/api/private', {
					headers : {
						...getActions().getAuthHeader()
					}
				})
				if(!resp.ok){
					console.error("Theres was an error: " + resp.statusText)
				}
				let data = await resp.json()
				return data
			},

			signup: async(email, password)=>{
				const resp = await fetch(apiUrl + '/api/signup', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				if (!resp.ok) {
					console.error("There was an error: " + resp.statusText)
					const data = await resp.json()
					console.log(data)
					return data.msg
				}
				const data = await resp.json()
				console.log(data)
				return true
			}

			// Use getActions to call a function within a fuction

		}
	};
};

export default getState;
