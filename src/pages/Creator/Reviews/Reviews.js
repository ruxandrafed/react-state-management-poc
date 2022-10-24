import { Link, Switch } from 'react-router-dom'
import RouteWithSubRoutes from '../../../components/RouteWithSubRoutes'

const Reviews = ({ routes }) => {
	const menu = [
		{
			path: '/creators/bon.jovi/reviews/new',
			name: 'Reviews New',
		},
		{
			path: '/creators/bon.jovi/reviews/manage',
			name: 'Reviews Manage',
		},
	]

	return (
		<div className='page-main'>
			<div className='navbar'>
				<ul>
					{menu.map((menuItem) => (
						<li key={menuItem.name}>
							<Link to={menuItem.path}>{menuItem.name}</Link>
						</li>
					))}
				</ul>
			</div>

			<div className='main'>
				<p>Creator Reviews</p>
				<Switch>
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}
				</Switch>
			</div>
		</div>
	)
}

export default Reviews
