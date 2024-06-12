import React from 'react';
import "./App.css";
import { Map } from './components/Map'
// import { parseCsv } from './utils/csvConverter'

const App: React.FC = () => {
  // parseCsv()
  return (
      <div className="App">
          <Map />
      </div>
  );
}

export default App;