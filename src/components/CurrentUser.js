import { memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Spinner from "@material-ui/core/CircularProgress"
import Alert from '@material-ui/lab/Alert'

import { useGlobalState, useGlobalDispatch } from '../context/Global'
import { Link } from 'react-router-dom'

const CurrentUserComponent = memo(({ currentUser, logout }) => {
	return (
		<Card>
			{ currentUser &&  <CardHeader title={`${currentUser.session_id}`} /> }
			<CardActions>
				{ currentUser && <Button variant="contained" onClick={logout}>Logout</Button> }
        { !currentUser && <Link to="/login">Login</Link> }
			</CardActions>
		</Card>
	)
})

const CurrentUserContainer = () => {
	const dispatch = useGlobalDispatch()
	const { user, loading, error, login, logout } = useGlobalState()
  const history = useHistory()

	const handleLogin = useCallback(async (e) => {
		e.preventDefault()

		try {
			let response = await login(dispatch, {
        session_username: 'email',
        session_password: 'password'
      })
			if (!response.session_id) return
			history.push('/creators')
		} catch (error) {
			console.log(error)
		}
	}, [])

	const handleLogout = useCallback(async (e) => {
		e.preventDefault()

		try {
			let response = await logout(dispatch)
			if (!response.ok) return
			history.push('/login')
		} catch (error) {
			console.log(error)
		}
	}, [])

	if (loading) return <Spinner />
	if (error) return <Alert severity="error">{ error.message }</Alert>

	return <CurrentUserComponent currentUser={user} login={handleLogin} logout={handleLogout} />
}

export default CurrentUserContainer
