// An example for how I like to setup my React contexts to make them super easy to consume

// the provider component (I usually have a folder called 'contexts')
import React, { useState, useEffect, createContext } from 'react'

export const FancyContext = createContext({ fancyThing: null, setFancyThing: () => {} })

export function FancyProvider({ children }) {
  const [fancy, setFancy] = useState({})

  useEffect(() => {
    // get the data you want, however you want (this is pseudocode)
    get(url).then(data => {
      setFancy(data)
    })
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FancyContext.Provider value={{ fancyThing: fancy, setFancyThing: setFancy }}>
      {children}
    </FancyContext.Provider>
  )
}

// in another file, wherever you use the context
import React from 'react'
import { FancyContext } from 'contexts'

export function FancyContextConsumerNamedWhateverYouWant(props) {
  // I use the React.useContext syntax b/c I find it easier to mock in unit tests
  const { fancyThing, setFancyThing } = React.useContext(FancyContext)

  return (
    <label>
      Fancy thing example
      <input type='text' value={fancyThing} onChange={e => setFancyThing(e.target.value)} />
    </label>
  )
}

// in App.js or whatever high-level component you want to wrap with your context so it's available in child components
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { FancyProvider } from 'contexts'
import { AuthenticatedRoute, ExampleComponent } from 'domains
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* abbreviated but I put my auth handling routes here  */}
      </Switch>
      <FancyProvider>
        <Switch>
          <AuthenticatedRoute path='/example/path' component={ExampleComponent} />
          {/* more routes here  */}
        </Switch>
      </FancyProvider>
    </BrowserRouter>
  )
}