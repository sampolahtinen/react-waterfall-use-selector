import { useState } from 'react'
import { actions, connect } from './store'
import { SubscribedComponent } from './SubscribedComponent'

const ConnectedComponent = ({testValue}) => {
  const [value, setValue] = useState('')
  const handleClick = () => actions.updateValue(value)
  return (
    <div>
      <span>{testValue}</span>
      <input name="state-value" onChange={(e) => setValue(e.target.value)}></input>
      <button onClick={handleClick}>Update value</button>
    </div>
  )
}

export default connect(({ testValue }) => ({ testValue }))(ConnectedComponent)