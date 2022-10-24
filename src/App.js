import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import AppProviders from './providers/AppProviders'
import NotFound from './pages/NotFound'
import routes from './config/routes'
import RouteWithSubRoutes from './components/RouteWithSubRoutes'

function App() {
	return (
		<BrowserRouter>
			<AppProviders>
				<Switch>
					<Redirect exact from='/' to='/login' />
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}
					<Route component={NotFound} />
				</Switch>
			</AppProviders>
		</BrowserRouter>
	)
}

export default App
