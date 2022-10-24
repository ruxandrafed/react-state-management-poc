export const initialState = {
	user: null,
	loading: false,
	error: null,
}

export const GlobalReducer = (initialState, action) => {
	switch (action.type) {
		case 'GET_SESSION':
			return {
				...initialState,
				loading: true,
			}
		case 'GET_SESSION_SUCCESS':
			return {
				...initialState,
				user: action.payload,
				loading: false,
			}
		case 'GET_SESSION_ERROR':
			return {
				...initialState,
				error: action.error,
				loading: false,
			}
		case 'CREATE_SESSION':
			return {
				...initialState,
				loading: true,
			}
		case 'CREATE_SESSION_SUCCESS':
			return {
				...initialState,
				user: action.payload,
				loading: false,
			}
		case 'CREATE_SESSION_ERROR':
			return {
				...initialState,
				loading: false,
				error: action.error,
			}
		case 'DELETE_SESSION':
			return {
				...initialState,
				loading: true
			}
		case 'DELETE_SESSION_SUCCESS':
			return {
				...initialState,
				user: null,
				loading: false,
			}
		case 'DELETE_SESSION_ERROR':
			return {
				...initialState,
				loading: false,
				error: action.error,
			}

		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}
