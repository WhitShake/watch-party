import React, { useState }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db } from './firebase_setup/firebase';
import { collection, getDocs } from 'firebase/firestore';

const colRef = collection(db, 'users')

const docSnap = await getDocs(colRef);

console.log('docSnap:', docSnap)
docSnap.forEach((doc) => {
  console.log("docSnap doc data:", doc.data());
})

const shelfRef = collection(db, 'users', 'mhSMG6jTIsi8tmjyhtPp', 'shelf')


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
