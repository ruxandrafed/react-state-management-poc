import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useGlobalState, useGlobalDispatch } from '../context/Global'

function Login(props) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useGlobalDispatch()
	const { login, error, loading } = useGlobalState()
	const { state } = useLocation()

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			let response = await login(dispatch, {
        session_username: email,
        session_password: password
      })
			if (!response.session_id) return
			props.history.push(state?.from || '/creators/bill_li')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='main'>
			<div className={{ width: 200 }}>
				<h1>Login Page</h1>
				{error ? <p>{error.message}</p> : null}
				<form>
					<div>
						<div>
							<label htmlFor='email'>Username</label>
							<input
								type='text'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
							/>
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
							/>
						</div>
					</div>
					<button onClick={handleLogin} disabled={loading}>
						login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
