import React, { useState, useEffect }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db, auth } from './firebase_setup/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Routes, Route } from "react-router-dom";
import { Home } from './components/home - randomizer/Home';
import { Search } from './components/pages/search_pages/Search';
import { Profile } from './components/users/Profile';
import { Playlist } from './components/pages/Playlist';
import { MovieObject, MovieProps, UserProfileData } from './components/prop_types/propsTypes';
import { getUserData, getFriendsList, fetchPlaylistMovies, initializeNewUser, fetchShelf, updateUserDoc, addFriend, deleteFriend, addMovieToPlaylist} from './firestore_functions/firestore_calls';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MoviePage } from './components/movie_data/MoviePage';
import { FriendPage } from './components/pages/FriendProfile';

// import { seedData, testSeed } from './firebase_setup/seedData';

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


const App = () => {
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_tmdb_apiKey;
  const BASE_URL = 'https://api.themoviedb.org/'; 

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MovieProps[]>([]);
  const [selectedSearchForm, setSelectedSearchForm] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [friendsData, setFriendsData] = useState<UserProfileData[]>([]);
  const [recentlyWatchedData, setRecentlyWatchedData] = useState<MovieProps[]>([]);
  const [shelf, setShelf] = useState<string[]>([])
  const [playlistTitle, setPlaylistTitle] = useState('') 
  const [playlistMovies, setPlaylistMovies] = useState<MovieProps[] | null>(null); 
  const [friendsList, setFriendsList] = useState<Record<string, any> | undefined>({})


  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await initializeNewUser(user.uid, user.displayName, user.email)
      setUserId(user.uid)
    } else {
      setUserId(null)
    }
  })


  useEffect(() => {
    if (userId !== null) {
      getUserData(userId)
      .then(data => setUserData(data as UserProfileData))

      getFriendsList(userId)
      .then(async friendsObject => {
        if (!friendsObject) return;
        const friendsIds = Object.keys(friendsObject)
        const friendsDataPromises = friendsIds.map(async friendId => {
          const toAdd = await getUserData(friendId);
          return {
            ...toAdd as UserProfileData,
            id: friendId,
          };
        });
        
        const friendsInfo = await Promise.all(friendsDataPromises);
        setFriendsData(friendsInfo as UserProfileData[]);
        setFriendsList(friendsObject)
      });

      fetchPlaylistMovies(userId, "Watched")
      .then(data => {
        if (data && data.movies) {
          const movies = data.movies
          let recentlyWatched = []
          for (let i = movies.length - 1; i >= Math.max(movies.length - 10, 0); i--) {
            recentlyWatched.push(movies[i])
          }
          setRecentlyWatchedData(recentlyWatched)
        } else {
          console.log("There was an issue fetching the movies!")
        }
      })

      fetchShelf(userId)
      .then(data => {
        setShelf(data)
      })
      // navigate("/profile")
    } else {
      setUserData(null)
      setFriendsData([])
      setRecentlyWatchedData([])
      setShelf([])
    }
  },[userId]);

  // this is just to view the state variables, delete later 
  useEffect(() => {
    console.log("friends:", friendsData)
    console.log("user", userData)
    console.log("recently watched movies", recentlyWatchedData)
    console.log("friends list:", friendsList)
  }, [friendsData, userData, recentlyWatchedData, friendsList])

  
  const searchUrls = {
    title: `${BASE_URL}3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`,
    person: `${BASE_URL}3/search/person?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`,
    related: `${BASE_URL}3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`,
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInfoUpdated = (field: keyof UserProfileData, value: string) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [field]: value
    } as UserProfileData))
  }


  const setCurrentPlaylistMovies = async (title: string) => {
    if (userId) {
        const playlistMovieList = await fetchPlaylistMovies(userId, title)
        setPlaylistMovies(playlistMovieList?.movies as MovieProps[])
    }
  }
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

    let idsAndPosterPaths: MovieProps[] = []

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

  return (
    <div className="App">
        <SideBar 
            signedInStatus={true} 
            shelf={shelf} 
            profilePic={userData?.profilePic} 
            firstName={userData?.firstName} 
            lastName={userData?.lastName} 
            setPlaylistTitle={setPlaylistTitle} 
            setPlaylistPage={setCurrentPlaylistMovies} 
            setShelf={setShelf}
            />
        <Routes>
          <Route path="/" element={<Home 
                                      // apiKey={apiKey}
                                      BASE_URL={BASE_URL}
                                      />}
                                      />
          <Route path="/profile" element={<Profile 
                                              userData={userData} 
                                              friendsData={friendsData} 
                                              setFriendsData={setFriendsData}
                                              friendsList={friendsList}
                                              setFriendsList={setFriendsList}
                                              watchedMovies={recentlyWatchedData} 
                                              handleUpdate={handleInfoUpdated}
                                              setRecentlyWatchedData={setRecentlyWatchedData}/>} />
          <Route path="/playlist/:id" element={<Playlist title={playlistTitle}  movies={playlistMovies} setRecentlyWatchedData={setRecentlyWatchedData}/>}/>
          <Route path="/search" element={<Search 
                                            handleChange={handleChange} 
                                            handleSubmit={handleSubmit} 
                                            handleSearchSelection={handleSearchSelection} 
                                            results={searchResults} 
                                            selectedSearchForm={selectedSearchForm}
                                            setRecentlyWatchedData={setRecentlyWatchedData}
                                            // handleAdvancedSearchTerms={hanndleAdvancedSearchTerms}
                                            />} />     
          <Route path="/movie-details/:title" element={<MoviePage apiKey={apiKey} shelf={shelf} />} />
          <Route path = "friend-details/:id" element={<FriendPage 
                                                          friendsList={friendsList} 
                                                          setFriendsList={setFriendsList} 
                                                          setFriendsData={setFriendsData}
                                                          setRecentlyWatchedData={setRecentlyWatchedData}/>} />
          {/* <Route path="/login" element={<Login />}/> */}
        </Routes>
    </div>
  );
  
};

export default App;
