import React, { useState, useEffect }from 'react';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { db } from './firebase_setup/firebase';
import 'firebase/firestore';
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/pages/Home';
import { Search } from './components/pages/search_pages/Search';
import { Profile } from './components/pages/Profile';
import { MovieObject, MovieProps, FriendsListProps, userProfileData } from './components/prop_types/propsTypes';
import { getUserData, getFriendsList, fetchFriendData, fetchWatchedMovies, addMovieToPlaylist } from './firestore_functions/firestore_calls';
import { Login } from './components/sidebar/Login';
import { MoviePage } from './components/pages/MoviePage';


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

// change this code after shelf is linked to user 
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
  const [movieDetails, setMovieDetails] = useState<{
    id: number; 
    posterPath: string; 
    details: string; 
    title: string; 
    runtime: number; 
    releaseDate: string; 
    genres: {id: number; name: string}[]
  }>({
    id: 0,
    posterPath: '',
    details: '',
    title: '',
    runtime: 0,
    releaseDate: '',
    genres: [],
  });

  // temporary use of dummy data 
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

  const handleMovieClick = (id: number) => {
    fetchMovieById(id)
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

  const fetchMovieById = (id: number) => {
    const url = `${BASE_URL}3/movie/${id}?api_key=${apiKey}`
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const currentMovieDetails= {
          id: data.id,
          posterPath: data.poster_path,
          details: data.overview,
          title: data.title,
          runtime: data.runtime,
          releaseDate: data.release_date,
          genres: data.genres,
        }
        console.log("current movie details:", currentMovieDetails)
      setMovieDetails(currentMovieDetails)
        console.log(movieDetails)
      })
    .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  };

  // const ShelfRef = collection(db, 'users', '')
  // const addMovieToList = (shelfName, movieId) => {
  //   const docRef = shelfRef.doc(shelfName);
  //   fetchMovieById(movieId);
  //   updateDoc(docRef, 
  //     movies: arrayUnion({
  //       id: movieDetails.id,
  //       posterPath: movieDetails.posterPath
  //     }))
  // }

  // const handleAddMovie = (userId: string, id:number, playlist:string) => {
  //   fetchMovieById(id)
  //   addMovieToPlaylist(userId, playlist, movieDetails.id, movieDetails.posterPath)
  // }

  const handleAddMovie = async (movieId: number, playlist: string) => {
    try {
      await fetchMovieById(movieId);
      if (movieDetails.id > 0) {
        await addMovieToPlaylist(playlist, movieDetails.id, movieDetails.posterPath);
      } else {
        console.log("Error fetching movie details");
      }
    } catch (error) {
      console.error("Error handling add movie:", error);
    }
  };
  


  return (
    <div className="App">
      <BrowserRouter>
        <SideBar signedInStatus={true} playlists={playlists} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile userData={userData} friends={friendsData} watchedMovies={recentlyWatchedData} handleMovieClick={handleMovieClick} movieDetails={movieDetails}/>} />
          <Route path="/search" element={<Search 
                                            handleChange={handleChange} 
                                            handleSubmit={handleSubmit} 
                                            handleSearchSelection={handleSearchSelection} 
                                            results={searchResults} 
                                            selectedSearchForm={selectedSearchForm}
                                            handleMovieClick={handleMovieClick}
                                            movieDetails={movieDetails}
                                            // handleAdvancedSearchTerms={hanndleAdvancedSearchTerms}
                                            />} />
          {/* <Route path="/login" element={<Login />}/> */}
          <Route path="/moviepage" element={<MoviePage movieDetails={movieDetails} handleAddMovie={handleAddMovie}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
  
};

export default App;
