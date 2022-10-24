export const initialState = {
	profileData: null,
	loading: false,
	error: null,
}

export const CreatorProfileReducer = (initialState, action) => {
	switch (action.type) {
		case 'GET_CREATOR_PROFILE':
			return {
				...initialState,
				loading: true
			}
		case 'GET_CREATOR_PROFILE_SUCCESS':
			return {
				...initialState,
				profileData: action.payload,
				loading: false
			}
		case 'GET_CREATOR_PROFILE_ERROR':
			return {
				...initialState,
				error: action.error,
				loading: false
			}

		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}
