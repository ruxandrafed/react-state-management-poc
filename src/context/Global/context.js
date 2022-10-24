import React, { useReducer, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from 'use-http'

import { initialState, GlobalReducer } from './reducer'

const GlobalStateContext = React.createContext()
const GlobalDispatchContext = React.createContext()

export function useGlobalState() {
	const context = React.useContext(GlobalStateContext)
	if (context === undefined) {
		throw new Error('useGlobalState must be used within a GlobalProvider')
	}

	return context
}

export function useGlobalDispatch() {
	const context = React.useContext(GlobalDispatchContext)
	if (context === undefined) {
		throw new Error('useGlobalDispatch must be used within a GlobalProvider')
	}

	return context
}

export const GlobalProvider = ({ children }) => {
	const location = useLocation()

	const [ userState, dispatch ] = useReducer(GlobalReducer, initialState)
	const { user, loading, error } = userState

	const { get, response: responseGet, error: errorGet, abort: abortGet } = useFetch('sessions')
  const { put, response: responsePut, error: errorPut } = useFetch('sessions')
  const { del, response: responseDel, error: errorDel } = useFetch('sessions')

	useEffect(() => {
    async function getSession () {
      try {
				dispatch({ type: 'GET_SESSION' })
				const sessionData = await get()
				if (responseGet.ok) {
					dispatch({ type: 'GET_SESSION_SUCCESS', payload: sessionData })
					return sessionData
				}
				dispatch({ type: 'GET_SESSION_ERROR', error: errorGet }) // TODO: review
				return
			} catch (error) {
				dispatch({ type: 'GET_SESSION_ERROR', error: error })
				console.log(error)
			}
    }

    getSession()

    return () => {
      abortGet()
    }
  }, [location.pathname])

	// Login with email and password
  const login = async (dispatch, loginPayload) => {
		try {
			dispatch({ type: 'CREATE_SESSION' })
			const sessionData = await put(loginPayload)
			if (responsePut.ok) {
				dispatch({ type: 'CREATE_SESSION_SUCCESS', payload: sessionData })
				return sessionData
			}
			dispatch({ type: 'CREATE_SESSION_ERROR', error: errorPut }) // TODO: review
			return
		} catch (error) {
			dispatch({ type: 'CREATE_SESSION_ERROR', error: error })
			console.log(error)
		}
  }

  // Logout
  const logout = async (dispatch) => {
		try {
			dispatch({ type: 'DELETE_SESSION' })
			await del()
			if (responseDel.ok) {
				dispatch({ type: 'DELETE_SESSION_SUCCESS' })
				return
			}
			dispatch({ type: 'DELETE_SESSION_ERROR', error: errorDel }) // TODO: review
			return
		} catch (error) {
			dispatch({ type: 'DELETE_SESSION_ERROR', error: error })
			console.log(error)
		}
  }

  // Memoize
  const value = useMemo(() => ({
    user,
		loading,
		error,
    login,
    logout
  }), [user, loading, error])

	return (
		<GlobalStateContext.Provider value={value}>
			<GlobalDispatchContext.Provider value={dispatch}>
				{children}
			</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	)
}
