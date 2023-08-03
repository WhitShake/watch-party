import React, { useState }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db } from './firebase_setup/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

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
      <div className="sidebar">
        <SideBar signedInStatus={true} playlists={playlists}/>
      </div>
    </div>
  );
};

export default App;
