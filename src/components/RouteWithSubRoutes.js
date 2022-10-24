import AppRoute from './AppRoute'

const RouteWithSubRoutes = (route) => {
	return (
		<AppRoute
	    key={route.path}
			path={route.path}
			isPrivate={route.isPrivate}
			render={(props) => (
				<route.component {...props} routes={route.routes} />
			)}
		/>
	);
};

export default RouteWithSubRoutes
