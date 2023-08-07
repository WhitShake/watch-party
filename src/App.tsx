import React, { useState, useEffect }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db } from './firebase_setup/firebase';
import { collection, getDocs, doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/pages/Home';
import { Search } from './components/pages/search_pages/Search';
import { Authentication } from './components/pages/Authentication';
import { Profile, ProfileProps } from './components/pages/Profile';
import { MovieProps, MovieObject } from './components/movie_data/Movie.types';

// import { seedData, testSeed } from './firebase_setup/seedData';

const apiKey = process.env.REACT_APP_tmdb_apiKey;
const BASE_URL = 'https://api.themoviedb.org/';

// code below is for seeding 

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
console.log("shelf reference:", shelfRef);

const shelfDocs = await getDocs(shelfRef);

let playlists: string[] = []; 
shelfDocs.forEach((doc) => {
  playlists.push(doc.id);
});

// const elizabethRef = doc(db, 'users', 'elizabeth123')
// const elizabethData = await getDoc(elizabethRef)
// console.log("data", elizabethData.data())



// console.log(elizabethDoc.data())
// const elizabethData = {
//   userData: elizabethDoc.data()
// }

// state for user name and for user data? 
// use effect to set user data whenever changes to user name are made? 
// parse through firestore data and set user data to the parsed data 
// data needed: username, firstName, lastName, quote, profilePic, shelf collection, friend collection 
// for sidebar shelf; query shelf collection for the one that equals watched. display the last 10 movies in the array 


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MovieProps[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [userData, setUserData] = useState<ProfileProps | null>(null);

  setUsername('elizabeth123')

  useEffect(() => {
    
    
  },[username])
  


  const Elizabeth = {
    firstName: 'Elizabeth',
    lastName: 'Example',
    profilePic: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg',
    quote: 'I\'ll be back',
    // recentlyWatched: [
    //   {
    //       id: 1, 
    //       posterPath: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg'
    //   },
    //   {
    //       id: 2, 
    //       posterPath: '/t7Pv44sBcxhc47kNNDDafNAgr7Y.jpg'
    //   },
    //   {
    //       id: 3, 
    //       posterPath: '/8AwVTcgpTnmeOs4TdTWqcFDXEsA.jpg'
    //   },
    //   {
    //       id: 4, 
    //       posterPath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
    //   },
    // ],
    // friendsList: ['Alyssa', 'Jackie', 'Whitney']
  }

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
          {/* pass search results onto search page; render if searchResults is truthy? */}

          <Route path="/authentication" element={<Authentication />} /> 
          <Route path="/profile" element={<Profile userData={Elizabeth}/>} />
            {/* need to add profile button to sidebar (maybe smol prof pic icon?) */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
