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
import { MovieObject, MovieProps, FriendsListProps, userProfileData } from './components/prop_types/propsTypes';
import { getUserData, getFriendsList, fetchFriendData, fetchWatchedMovies } from './firestore_functions/firestore_calls';
import { Login } from './components/sidebar/Login';

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


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{id: number; posterPath: string}[]>([]);
  const [selectedSearchForm, setSelectedSearchForm] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const [userData, setUserData] = useState<userProfileData | null>(null);
  const [friendsData, setFriendsData] = useState<{id: string; profilePic: string}[] | null>(null);
  const [recentlyWatchedData, setRecentlyWatchedData] = useState<MovieProps[]>([]);

  if (username === null) {
    setUsername('elizabeth123');
  };

  useEffect(() => {
    if (username !== null) {
      getUserData(username)
      .then(data => setUserData(data as userProfileData))

      getFriendsList(username)
      .then(async data => {
        const friendData = await fetchFriendData(data.friends as string[])
        setFriendsData(friendData as {id: string, profilePic: string}[])
      })

      fetchWatchedMovies(username)
      .then(data => {
        if (data && data.movies) {
          const movies = data.movies
          console.log("all the movies:", data.movies)
          let recentlyWatched = []
          for (let i = movies.length - 1; i >= Math.max(movies.length - 10, 0); i--) {
            recentlyWatched.push(movies[i])
          }
          setRecentlyWatchedData(recentlyWatched)
        } else {
          console.log("There was an issue fetching the movies!")
        }
      })
    }
  },[username]);

  // this is just to view the state variables, delete later 
  useEffect(() => {
    console.log("friends:", friendsData)
    console.log("user", userData)
    console.log("recently watched movies", recentlyWatchedData)
  }, [friendsData, userData, recentlyWatchedData])

  const searchUrls = {
    title: `${BASE_URL}3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`,
    person: `${BASE_URL}3/search/person?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`,
    related: `${BASE_URL}3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`,
  }




  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

//   const hanndleAdvancedSearchTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const inputString = event.target.value;
//     const formattedList = inputString.split("|")
//     console.log(formattedList)
//     retrieveItem(formattedList)
//   };
// const retrieveItem = (stringList: string[]) => {
//     stringList.forEach((item) => {
//       // fetchId(item); figure out how to call handle submit with person
//     });
//   };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedSearchForm === "title") {
    const url = searchUrls.title
    fetchData(url)

    } else if (selectedSearchForm === "person") {
      const url = searchUrls.person;
      fetchId(url);

      } else if (selectedSearchForm === "related") {
        const url = searchUrls.related;
        fetchId(url)
      }
    };


  const handleSearchSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSearchForm(event.currentTarget.value);
    setSearchResults([]);
  };  


  const fetchId = (url: string) => {
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const personId: number = data.results[0].id
        fetchById(personId, selectedSearchForm);
      })
      .catch(error => {
        console.error('Error fetching person ID:', error);
      });
    };

  const fetchData = (url: string) => {
    let idsAndPosterPaths: MovieProps[] = [] 
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          data.results.map((movie: MovieObject) => (
            idsAndPosterPaths.push(
              {
                id: movie.id,
                posterPath: movie.poster_path
              })
          ));
        console.log("ids and poster paths:", idsAndPosterPaths);
        setSearchResults(idsAndPosterPaths);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchById = (id: number, selectedSearchForm: string) => {

    let idsAndPosterPaths: {id: number; posterPath: string}[] = []

    const searchByIdUrl = {
      person: `${BASE_URL}3/person/${id}/movie_credits?api_key=${apiKey}`,
      related: `${BASE_URL}3/movie/${id}/similar?language=en-US&page=1&api_key=${apiKey}`,
    };
    
    console.log(searchByIdUrl.related)
    if (selectedSearchForm === "person") {
      const url = searchByIdUrl.person;
      fetch(url)
      .then(response => response.json())
      .then((data) => {
        if (data.cast && data.cast.length > 0) {
          data.cast.forEach((movie: MovieObject) => {
            idsAndPosterPaths.push({
              id: movie.id,
              posterPath: movie.poster_path
            });
          });
          setSearchResults(idsAndPosterPaths);
        }
      })
      .catch((error) => {
        console.error('Error fetching person data:', error);
      });

    } else if (selectedSearchForm === "related") {
      const url = searchByIdUrl.related;
      console.log(url)
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            data.results.forEach((movie: MovieObject) => {
              idsAndPosterPaths.push({
                id: movie.id,
                posterPath: movie.poster_path
              });
            });
            setSearchResults(idsAndPosterPaths);
          }
        })
    .catch(error => {
      console.error('Error fetching person data:', error);
    });
  }
};

  // const handleAdvancedCast = () => {
  //   const castUrl = 
  //   fetchData(searchUrls.person)
  // }

  // const handleCheckboxSelection = () => {
  //   const genreUrl = "";

  // }

  return (
    <div className="App">
      <BrowserRouter>
        <SideBar signedInStatus={true} playlists={playlists} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile userData={userData} friends={friendsData} watchedMovies={recentlyWatchedData}/>} />
          <Route path="/search" element={<Search 
                                            handleChange={handleChange} 
                                            handleSubmit={handleSubmit} 
                                            handleSearchSelection={handleSearchSelection} 
                                            results={searchResults} 
                                            selectedSearchForm={selectedSearchForm}
                                            // handleAdvancedSearchTerms={hanndleAdvancedSearchTerms}
                                            />} />
          {/* <Route path="/login" element={<Login />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
  
};

export default App;
