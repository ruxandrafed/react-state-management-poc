import { GlobalProvider } from '../context/Global'
import { FetchProvider } from './FetchProvider'

function AppProviders ({ children }) {
  return (
    <FetchProvider>
      <GlobalProvider>
        {children}
      </GlobalProvider>
    </FetchProvider>
  )
}

export default AppProviders
