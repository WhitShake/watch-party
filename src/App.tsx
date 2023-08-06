import React, { useState, useEffect }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db } from './firebase_setup/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/pages/Home';
import { Search } from './components/pages/search_pages/Search';
import { Authentication } from './components/pages/Authentication';
import { Profile } from './components/pages/Profile';

const apiKey = process.env.REACT_APP_tmdb_apiKey;
const BASE_URL = 'https://api.themoviedb.org/';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{id: number; posterPath: string}[]>([]);
  const [selectedSearchForm, setSelectedSearchForm] = useState<string>("");

  const Elizabeth = {
    firstName: 'Elizabeth',
    lastName: 'Example',
    image: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg',
    quote: 'I\'ll be back',
    recentlyWatched: [
      {
          id: 1, 
          posterPath: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg'
      },
      {
          id: 2, 
          posterPath: '/t7Pv44sBcxhc47kNNDDafNAgr7Y.jpg'
      },
      {
          id: 3, 
          posterPath: '/8AwVTcgpTnmeOs4TdTWqcFDXEsA.jpg'
      },
      {
          id: 4, 
          posterPath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
      },
    ],
    friendsList: ['Alyssa', 'Jackie', 'Whitney']
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchUrl = (`${BASE_URL}3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
    fetchData(searchUrl)
  }

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   //routing logic goes here
  // };

  const handleSearchSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSearchForm(event.currentTarget.value);
  };  

  type MovieObject = {
    id: number
    original_language: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }

  // type idsAndPosterPathsObject = {
  //   id: number
  //   posterPath: string
  // }

  const fetchData = (url: string) => {
    let idsAndPosterPaths: {id: number; posterPath: string}[] = [] 
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          data.results.map((movie: MovieObject) => (
            idsAndPosterPaths.push(
              {
                id: movie.id,
                posterPath: movie.poster_path
              }
            )
          ))
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
          <Route path="/search" element={<Search handleChange={handleChange} handleSubmit={handleSubmit} handleSearchSelection={handleSearchSelection} results={searchResults} selectedSearchForm={selectedSearchForm}/>} />
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
