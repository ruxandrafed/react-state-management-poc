import { Link, useParams } from 'react-router-dom'

import CurrentUserContainer from '../../components/CurrentUser'
import CreatorProfileContainer from './CreatorProfile'

const CreatorSidebar = () => {
	const menu = [
		{
			path: '/creators/bon.jovi/reviews',
			name: 'Reviews',
		},
		{
			path: '/creators/bon.jovi/settings',
			name: 'Settings',
		},
		{
			path: '/creators/bon.jovi',
			name: 'Profile',
		}
	]

	return (
		<div className='sidebar'>
			<h2>Creator Sidebar</h2>
			<ul>
				{menu.map((menuItem) => (
					<li key={menuItem.name}>
						<Link to={menuItem.path}>{menuItem.name}</Link>
					</li>
				))}
			</ul>

			<CreatorProfileContainer />

			<CurrentUserContainer />

		</div>
	)
}

export default CreatorSidebar
