import React, { useState }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db } from './firebase_setup/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/pages/Home';
import { Search } from './components/pages/Search';
import { Authentication } from './components/pages/Authentication';
import { Profile } from './components/pages/Profile';

// const userColRef = collection(db, 'users')
// const userDocs = await getDocs(userColRef);

// console.log('userDocs:', userDocs)
// userDocs.forEach((doc) => {
//   console.log("userDocs doc data:", doc.data());
// })

const shelfRef = collection(db, 'users', 'mhSMG6jTIsi8tmjyhtPp', 'Shelf');
console.log("shelf reference:", shelfRef);

const shelfDocs = await getDocs(shelfRef);

let playlists: string[] = []; 
shelfDocs.forEach((doc) => {
  playlists.push(doc.id);
});


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar signedInStatus={true} playlists={playlists} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/authentication" element={<Authentication />} /> 
          <Route path="/profile" element={<Profile />} />
            {/* need to add profile button to sidebar (maybe smol prof pic icon?) */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
