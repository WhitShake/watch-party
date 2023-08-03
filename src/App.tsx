import React, { useState }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';

const App = () => {
  return (
    <div className="App">
      <div className="sidebar">
        <SideBar signedInStatus={true}/>
      </div>
    </div>
  );
}

export default App;
