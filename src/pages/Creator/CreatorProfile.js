import { memo, useEffect } from 'react'

import Spinner from "@material-ui/core/CircularProgress"
import Alert from '@material-ui/lab/Alert'

import { useCreatorProfileState } from '../../context/CreatorProfile'

const CreatorProfileComponent = memo(({ name, avatarUrl }) => {
	return (
		<div>
			<p>{ name }</p>
			<img width="100px" src={avatarUrl} alt={name} />
		</div>
	)
})

const CreatorProfileContainer = () => {
	const { profileData, loading, error } = useCreatorProfileState()

	if (loading) return <Spinner />
	if (error) return <Alert severity="error">{ error.message }</Alert>

  if (!profileData) return <div>No profile</div>

	const avatarUrl = profileData.profile.profile_media.find((media) => media.medium_content === 'AVATAR').files[0].file_url

	return (
		<CreatorProfileComponent name={profileData.profile.profile_name} avatarUrl={avatarUrl}/>
	)

}

export default CreatorProfileContainer
