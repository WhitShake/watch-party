import React, { useEffect, useState } from 'react';
import './Playlist.css'
import { MovieList } from '../movie_data/MovieList';
import { MovieProps, PlaylistProps } from '../prop_types/propsTypes';
import { useParams } from 'react-router-dom';
import { fetchPlaylistMovies } from '../../firestore_functions/firestore_calls';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';


export const Playlist = (props: PlaylistProps) => {
    const { title } = useParams();
    const [user] = useAuthState(auth);
    const [playlistDetails, setPlaylistDetails] = useState<MovieProps[]>()

    const getPlaylistMovies = async () => {
        if (user && title) {
            const data = await fetchPlaylistMovies(user.uid, title)
            if (data) {
                setPlaylistDetails(data.movies as MovieProps[])
            }
        }
        return [];
    }

    useEffect(() => {
        // const fetchData = async () => {
        //     const movies = await getPlaylistMovies()
        //     setPlaylistDetails(movies)
        // }
        // fetchData();
        getPlaylistMovies();
    }, [user, title])


    // if (id) {
    //     getUserData(id)
    //     .then(data => setUserData(data as UserProfileData));

    //     getFriendsList(id)
    //     .then(async friendsObject => {
    //         if (!friendsObject) return;
    //         const friendsIds = Object.keys(friendsObject)
    //         const friendsDataPromises = friendsIds.map(async friendId => {
    //             const toAdd = await getUserData(friendId);
    //             return {
    //                 ...toAdd as UserProfileData,
    //                 id: friendId,
    //             };
    //         });
    //         const friendsInfo = await Promise.all(friendsDataPromises);
    //         setUserFriendsData(friendsInfo as UserProfileData[])
    //     });

    //     fetchPlaylistMovies(id, "Watched")
    //     .then(data => {
    //         if (data && data.movies) {
    //             const movies = data.movies;
    //             let recentlyWatchedMovies: MovieProps[] = []
    //             for (let i = movies.length - 1; i >= Math.max(movies.length - 10, 0); i--) {
    //                 recentlyWatchedMovies.push(movies[i])
    //             }
    //             setRecentlyWatched(recentlyWatchedMovies)
    //         }
    //     })
    // }





    return (
        <div className="playlist-container">
            <h1 className="title">{title}</h1>
            {playlistDetails && playlistDetails.length !== 0
            ? <MovieList movies={playlistDetails} setRecentlyWatchedData={props.setRecentlyWatchedData} />
            : <h2 className="message">Add movies to this playlist!</h2>
            }
        </div>
    )
}

// add routes to specific playlist page that renders according to a firebase call to fetch movies 



// use react router to link to /playlist 
// pass in the title for the header
// make a call to the firestore to populate the movies 
// render a movie list, passing in the data from the firestore call 