import React, { useState, useEffect }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { auth } from './firebase_setup/firebase';
import { Routes, Route } from "react-router-dom";
import { Home } from './components/home - randomizer/Home';
import { Search } from './components/pages/search_pages/Search';
import { Profile } from './components/users/Profile';
import { Playlist } from './components/pages/Playlist';
import { MovieObject, MovieProps, UserProfileData } from './components/prop_types/propsTypes';
import { getUserData, getFriendsList, fetchPlaylistMovies, initializeNewUser, fetchShelf } from './firestore_functions/firestore_calls';
import { onAuthStateChanged } from 'firebase/auth';
import { MoviePage } from './components/movie_data/MoviePage';
import { FriendPage } from './components/pages/FriendPage';


const App = () => {
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
  const [friendsList, setFriendsList] = useState<Record<string, any> | undefined>({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await initializeNewUser(user.uid, user.displayName, user.email);
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

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

    } else {
      setUserData(null)
      setFriendsData([])
      setRecentlyWatchedData([])
      setShelf([])
    }
  },[userId]);


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
            shelf={shelf} 
            profilePic={userData?.profilePic} 
            firstName={userData?.firstName} 
            lastName={userData?.lastName} 
            setShelf={setShelf}
            />
        <Routes>
          <Route path="/" element={<Home 
                                      BASE_URL={BASE_URL}
                                      
                                      />}
                                      />
          <Route path="/search" element={<Search 
                                            handleChange={handleChange} 
                                            handleSubmit={handleSubmit} 
                                            handleSearchSelection={handleSearchSelection} 
                                            results={searchResults} 
                                            selectedSearchForm={selectedSearchForm}
                                            setRecentlyWatchedData={setRecentlyWatchedData}
                                            />} />     
          <Route path="/profile" element={<Profile 
                                              userData={userData} 
                                              friendsData={friendsData} 
                                              setFriendsData={setFriendsData}
                                              friendsList={friendsList}
                                              setFriendsList={setFriendsList}
                                              watchedMovies={recentlyWatchedData} 
                                              handleUpdate={handleInfoUpdated}
                                              setRecentlyWatchedData={setRecentlyWatchedData}/>} />
          <Route path="/playlist/:title" element={<Playlist setRecentlyWatchedData={setRecentlyWatchedData}/>}/>
          <Route path="/search" element={<Search 
                                            handleChange={handleChange} 
                                            handleSubmit={handleSubmit} 
                                            handleSearchSelection={handleSearchSelection} 
                                            results={searchResults} 
                                            selectedSearchForm={selectedSearchForm}
                                            setRecentlyWatchedData={setRecentlyWatchedData}
                                            // handleAdvancedSearchTerms={hanndleAdvancedSearchTerms}
                                            />} />  
          <Route path="/movie-details/:id" element={<MoviePage apiKey={apiKey} shelf={shelf} />} />
          <Route path = "/friend-details/:id" element={<FriendPage 
                                                          friendsList={friendsList} 
                                                          currentUser={userData}
                                                          setFriendsList={setFriendsList} 
                                                          setFriendsData={setFriendsData}
                                                          setRecentlyWatchedData={setRecentlyWatchedData}/>} />
        </Routes>
    </div>
  );
  
};

export default App;
