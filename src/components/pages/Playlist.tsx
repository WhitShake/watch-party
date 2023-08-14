import React, { useEffect, useState } from 'react';
import './Playlist.css'
import { MovieList } from '../movie_data/MovieList';
import { MovieProps, PlaylistProps } from '../prop_types/propsTypes';
import { useParams } from 'react-router-dom';
import { deleteMovieOffPlaylist, fetchPlaylistMovies } from '../../firestore_functions/firestore_calls';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';


export const Playlist = (props: PlaylistProps) => {
    const { title } = useParams();
    const [user] = useAuthState(auth);
    const [playlistDetails, setPlaylistDetails] = useState<MovieProps[]>()
    const [renderOnDeletion, setRenderOnDeletion] = useState(false)

    const getPlaylistMovies = async () => {
        if (user && title) {
            const data = await fetchPlaylistMovies(user.uid, title)
            if (data) {
                setPlaylistDetails(data.movies as MovieProps[])
            }
        }
        return [];
    }

    const handleDeleteFromPlaylist = (toDelete: number, posterToDelete: string) => {
        if (title) {
            deleteMovieOffPlaylist(user?.uid, title, {id: toDelete, posterPath: posterToDelete});
            setRenderOnDeletion(prev => !prev);
        }
    }

    useEffect(() => {
        getPlaylistMovies();
    }, [user, title, renderOnDeletion])

    return (
        <div className="playlist-container">
            <h1 className="title">{title}</h1>
            {playlistDetails && playlistDetails.length !== 0
            ? <MovieList 
                    movies={playlistDetails} 
                    setRecentlyWatchedData={props.setRecentlyWatchedData} 
                    handleDeletion={handleDeleteFromPlaylist}/>
            : <h2 className="message">Add movies to this playlist!</h2>
            }
        </div>
    )
}
