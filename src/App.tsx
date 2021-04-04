import { useState } from 'react';
import './App.css';
import ConnectedComponent from './ConnectedComponent';
import { Provider } from './store';
import { SubscribedComponent } from './SubscribedComponent';

function App() {
  const [toggle, setToggle] = useState(false)
  const [isSubCompVisible, setIsSubCompVisible] = useState(true)
  return (
    <div className="App">
      <Provider>
        <ConnectedComponent />
        {isSubCompVisible && (
          <SubscribedComponent matchString={toggle ? 'test' : 123} />
        )}
        <button style={{margin: '20px 0'}} type="button" onClick={() => setToggle(!toggle)}>TOGGLE</button>
        <button type="button" onClick={() => setIsSubCompVisible(!isSubCompVisible)}>TOGGLE SUBSCRIBED COMPONENT MOUNT</button>
      </Provider>
    </div>
  );
}

export default App;
