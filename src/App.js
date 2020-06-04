import React from 'react';
import {Header} from './Components/header.js';
import {Catalog} from './Components/catalog.js';
import {Filtered} from './Components/filtered.js';

const App = () => {
  const[favVisibility, setVisibility] = React.useState(false);

  return (
      <div>
          <Header favVisibility={favVisibility} setVisibility={setVisibility}/>
          <Filtered favVisibility={favVisibility} setVisibility={setVisibility}/>
      </div>
  )
}

export default App;
