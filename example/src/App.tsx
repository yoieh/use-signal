import React from 'react'
import { UseSignalExample } from './UseSignalExample'
import { UseListenerExample } from './UseListenerExample'

const App = () => {
  return (
    <div>
      <div>
        <h3>UseSignalExample</h3>
        <UseSignalExample></UseSignalExample>
      </div>
      <div>
        <h3>UseListenerExample</h3>
        <UseListenerExample></UseListenerExample>
      </div>
    </div>
  )
}

export default App
