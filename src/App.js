import React from 'react';
import {Header} from './Components/header.js';
import {Catalog} from './Components/catalog.js';

const App = () => {
  const[favVisibility, setVisibility] = React.useState(false);

  return (
      <div>
          <Header favVisibility={favVisibility} setVisibility={setVisibility}/>
          {Catalog()}
      </div>
  )
}

export default App;
