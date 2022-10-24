import { Switch } from 'react-router-dom'

import RouteWithSubRoutes from '../../components/RouteWithSubRoutes'
import { CreatorProfileProvider } from '../../context/CreatorProfile'
import CreatorSidebar from './CreatorSidebar'

const Creator = ({ routes }) => {
	return (
		<CreatorProfileProvider>
			<div className='home'>
				<CreatorSidebar />
				<Switch>
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}
				</Switch>
			</div>
		</CreatorProfileProvider>
	)
}

export default Creator
