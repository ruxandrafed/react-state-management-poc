import React, { useReducer, useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useFetch from 'use-http'

import { initialState, CreatorProfileReducer } from './reducer'

const CreatorProfileStateContext = React.createContext()
const CreatorProfileDispatchContext = React.createContext()

export function useCreatorProfileState() {
	const context = React.useContext(CreatorProfileStateContext)
	if (context === undefined) {
		throw new Error('useCreatorProfileState must be used within a CreatorProfileProvider')
	}

	return context
}

export function useCreatorProfileDispatch() {
	const context = React.useContext(CreatorProfileDispatchContext)
	if (context === undefined) {
		throw new Error('useCreatorProfileDispatch must be used within a CreatorProfileProvider')
	}

	return context
}

export const CreatorProfileProvider = ({ children }) => {
	const { handle } = useParams()

	const [ creatorProfileState, dispatch ] = useReducer(CreatorProfileReducer, initialState)
	const { profileData, loading, error } = creatorProfileState

	const { get, response, error: errorGet, abort } = useFetch(`/creator-profiles/${encodeURIComponent(handle)}`)

	useEffect(() => {
    fetchProfile(dispatch)
    return () => {
      abort()
    }
  }, [handle])

  const fetchProfile = async (dispatch) => {
		try {
			dispatch({ type: 'GET_CREATOR_PROFILE' })
			const profileData = await get()
			if (response.ok) {
				dispatch({ type: 'GET_CREATOR_PROFILE_SUCCESS', payload: profileData })
				return profileData
			}
			dispatch({ type: 'GET_CREATOR_PROFILE_ERROR', error: errorGet }) // TODO: review
			return
		} catch (error) {
			dispatch({ type: 'GET_CREATOR_PROFILE_ERROR', error: error })
			console.log(error)
		}
  }

  // Memoize
  const value = useMemo(() => ({
    profileData,
		loading,
		error,
    fetchProfile
  }), [profileData, loading, error])

	return (
		<CreatorProfileStateContext.Provider value={value}>
			<CreatorProfileDispatchContext.Provider value={dispatch}>
				{children}
			</CreatorProfileDispatchContext.Provider>
		</CreatorProfileStateContext.Provider>
	)
}
