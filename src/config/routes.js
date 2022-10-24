import Creator from '../pages/Creator/Creator'
import CreatorHome from '../pages/Creator/CreatorHome'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Reviews from '../pages/Creator/Reviews/Reviews'
import ReviewsNew from '../pages/Creator/Reviews/ReviewsNew'
import ReviewsManage from '../pages/Creator/Reviews/ReviewsManage'
import Settings from '../pages/Creator/Settings/Settings'

const routes = [
	{
		path: '/login',
		component: Login,
    isPrivate: false,
	},
  {
    path: '/home',
    component: Home,
    isPrivate: false,
  },
	{
		path: '/creators/:handle',
		component: Creator,
		routes: [
      {
        path: '/creators/:handle',
        exact: true,
        isPrivate: true,
        component: CreatorHome,
      },
			{
				path: '/creators/:handle/reviews',
				component: Reviews,
        isPrivate: true,
				routes: [
					{
						path: '/creators/:handle/reviews/new',
						component: ReviewsNew,
            isPrivate: true
					},
					{
						path: '/creators/:handle/reviews/manage',
						component: ReviewsManage,
            isPrivate: true
					},
				]
			},
			{
				path: '/creators/:handle/settings',
				component: Settings,
        isPrivate: true
			}
		],
	},
]

export default routes
