import React, { useState, useEffect }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db } from './firebase_setup/firebase';
import { collection, getDocs, doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/pages/Home';
import { Search } from './components/pages/search_pages/Search';
import { Authentication } from './components/pages/Authentication';
import { Profile } from './components/pages/Profile';
import { MovieObject, MovieProps, FriendsListProps, userProfileData } from './components/prop_types/propsTypes';
import { getUserData, getFriendsList, fetchFriendData } from './firestore_functions/firestore_calls';

// import { seedData, testSeed } from './firebase_setup/seedData';

const apiKey = process.env.REACT_APP_tmdb_apiKey;
const BASE_URL = 'https://api.themoviedb.org/';


// code below is for seeding. uncomment the import of seedData 
// // fetchMovies acts similarly to fetchData, just grabs ids and poster paths
// const fetchMovies = (url: string) => {
//   let idsAndPosterPaths: {id: number; posterPath: string}[] = [] 
//   fetch(url)
//     .then(response => response.json())
//     .then(data=> {
//       if (data.results.length > 0) {
//         {data.results.map((movie: MovieObject) => (
//           idsAndPosterPaths.push(
//             {
//               id: movie.id,
//               posterPath: movie.poster_path
//             }
//           )
//         ))}
//       }
//       console.log("ids and poster paths:", idsAndPosterPaths);
//       return idsAndPosterPaths
//     })
//     .then(idsAndPosterPaths => {
//       seedData(idsAndPosterPaths)
//     })
// }

// // fetches popular movies 
// fetchMovies(`${BASE_URL}3/movie/popular?api_key=${apiKey}`) 
// end of seed code 

const shelfRef = collection(db, 'users', 'testUser123', 'Shelf');
// console.log("shelf reference:", shelfRef);

const shelfDocs = await getDocs(shelfRef);

let playlists: string[] = []; 
shelfDocs.forEach((doc) => {
  playlists.push(doc.id);
});



// state for user name and for user data? 
// use effect to set user data whenever changes to user name are made? 
// parse through firestore data and set user data to the parsed data 
// data needed: username, firstName, lastName, quote, profilePic, shelf collection, friend collection 
// for sidebar shelf; query shelf collection for the one that equals watched. display the last 10 movies in the array 


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MovieProps[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [userData, setUserData] = useState<userProfileData | null>(null);
  const [friendsData, setFriendsData] = useState<{id: string; profilePic: string}[] | null>(null);

  if (username === null) {
    setUsername('elizabeth123')
  }

  useEffect(() => {
    if (username !== null) {
      getUserData(username)
      .then(data => setUserData(data as userProfileData))

      getFriendsList(username)
      .then(async data => {
        console.log(data)
        const friendData = await fetchFriendData(data.friends as string[])
        setFriendsData(friendData as {id: string, profilePic: string}[])
      })
    }
  },[username])


  // useEffect(() => {
  //   console.log("friends:", friendsData)
  //   console.log("user", userData)
  // }, [friendsData, userData])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchUrl = (`${BASE_URL}3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
    fetchData(searchUrl)
  }


  const fetchData = (url: string) => {
    let idsAndPosterPaths: MovieProps[] = [] 
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          {data.results.map((movie: MovieObject) => (
            idsAndPosterPaths.push(
              {
                id: movie.id,
                posterPath: movie.poster_path
              }
            )
          ))}
        console.log("ids and poster paths:", idsAndPosterPaths);
        setSearchResults(idsAndPosterPaths);
        }
      })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <SideBar signedInStatus={true} playlists={playlists} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search handleChange={handleChange} handleSubmit={handleSubmit} results={searchResults}/>} />
          <Route path="/authentication" element={<Authentication />} /> 
          <Route path="/profile" element={<Profile userData={userData} friends={friendsData}/>} />
            {/* need to add profile button to sidebar (maybe smol prof pic icon?) */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
