import React from 'react'
import { Provider } from 'use-http'

export function FetchProvider ({ children }) {
  const fetchBffOptions = {
    interceptors: {
      request: async ({ options }) => {
        if (!options.credentials) {
          options.credentials = 'include'
        }
        if (options.method === 'POST' || options.method === 'PUT') {
          options.headers['Content-Type'] = 'application/json'
        }
        return options
      }
    },
    cachePolicy: 'cache-first' // to avoid re-renders
  }
  return (
    <Provider url={`${process.env.REACT_APP_WEB_BFF_HOST}/api`} options={fetchBffOptions}>
      {children}

    </Provider>
  )
}
