import React, { useState }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db } from './firebase_setup/firebase';
import { collection, getDocs } from 'firebase/firestore';

const userColRef = collection(db, 'users')
const userDocs = await getDocs(userColRef);

console.log('userDocs:', userDocs)
userDocs.forEach((doc) => {
  console.log("userDocs doc data:", doc.data());
})

const shelfRef = collection(db, 'users', 'mhSMG6jTIsi8tmjyhtPp', 'shelf')
console.log("shelf reference:", shelfRef)

const shelfDocs = await getDocs(shelfRef)
shelfDocs.forEach((doc) => {
  console.log("shelf doc data:", doc.data())
})



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
