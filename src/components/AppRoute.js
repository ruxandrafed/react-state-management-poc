import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'

import { useGlobalState } from '../context/Global'

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
	const { user } = useGlobalState()
	const location = useLocation()

	if (isPrivate && (user === null)) {
		return <Redirect to={{ pathname: '/login', state: { from: location } }} />
	}

	return (
		<Route
			path={path}
			render={(props) => {
				return <Component {...props} />
			}}
			{...rest}
		/>
	)
}

export default AppRoute
