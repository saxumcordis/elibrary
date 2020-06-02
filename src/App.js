import React from 'react';
import {Header} from './Components/header.js';
import {Catalog} from './Components/catalog.js';

const App = () => {
  const[a, setA] = React.useState(1)

  return (
      <div>
        <span>{a}</span>
        {Header()}
        {Catalog()}
      </div>
  )
}

export default App;
