import React from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';


function App() {
  return (
    <div className="App">
      <div>
        <SideBar signedInStatus={true}/>
      </div>
    </div>
  );
}

export default App;
