import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './MoviePage.css'
import { useParams } from 'react-router-dom';
import { addMovieToPlaylist } from '../../firestore_functions/firestore_calls';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';
import { MovieProps, MoviePageProps, MovieDetails } from '../prop_types/propsTypes';



export const MoviePage = ({ apiKey, shelf }: MoviePageProps) => { 
    const [user] = useAuthState(auth);
    const [details, setDetails] = useState<MovieDetails>();
    const { id } = useParams();
    const movieId = parseInt(id as string, 10);

    const fetchDetails = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        const data = await response.json()
        const { genres, original_title, overview, release_date, runtime, tagline, poster_path } = data
        return { genres, original_title, overview, release_date, runtime, tagline, poster_path }
    }

    useEffect(() => {
        const getMovieDetails = async () => {
            const movieDetails = await fetchDetails();
            setDetails(movieDetails);
        };
        getMovieDetails();
    },[id])

    const handleAddMovieToPlaylist = (playlistTitle: string, movie: MovieProps) => {
        addMovieToPlaylist(user?.uid, playlistTitle, movie)
        console.log("movie added")
    }


    return (
        <div className="movie-details">
            <img className="card" alt="movie cover" src={details?.poster_path === null 
                            ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                            : `http://image.tmdb.org/t/p/w185${details?.poster_path}`} />
            {details && <h2> {details.original_title} </h2>}
            {details && <h2> {details.tagline}</h2>}
            {details && <h2> Year of release: {details.release_date.slice( 0 , 4 )}</h2>}
            {details && <h2> Runtime: {details.runtime} min</h2>}
            {details && <h2> Description: {details.overview} min</h2>}


            <h2>Add to Playlist</h2>
            {shelf.map((playlist, i) => {
                return (
                    <div key={i}>
                        <button onClick={() => {
                            if (movieId && details) {
                                handleAddMovieToPlaylist(playlist, {id: movieId, posterPath: details.poster_path})}
                            }
                        }>{playlist}</button><br/>
                    </div>
                )
            })}
            

            {/* <div className="dropdown">
                <div className="dropdown-button">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="dropdown-content"> */}
                    {/* <button onClick={handleClick}>View More Details</button> */}
                    {/* <a href="#">Add Movie to Playlist</a>
            
                    {shelf.map(playlist => (
                    <a href="#" key={playlist}>{playlist}</a>
                    ))}
                </div>
            </div> */}

        </div>
    )
}