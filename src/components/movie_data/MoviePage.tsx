import React, { useEffect, useState } from 'react';
import './MoviePage.css'
import { useParams } from 'react-router-dom';
import { addMovieToPlaylist } from '../../firestore_functions/firestore_calls';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';
import { MovieProps, MoviePageProps, MovieDetails, ProviderObject, Provider } from '../prop_types/propsTypes';
import { WatchProviderIcons } from '../home - randomizer/WatchProviderIcons';

const apiKey = process.env.REACT_APP_tmdb_apiKey;
const BASE_URL = 'https://api.themoviedb.org/'; 

export const MoviePage = ({ apiKey, shelf }: MoviePageProps) => { 
    const [user] = useAuthState(auth);
    const [details, setDetails] = useState<MovieDetails>();
    const [watchProvidersList, setWatchProvidersList] = useState<ProviderObject[]>([]);
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

    const fetchWatchProviders = (movieId: number) => {
        let watchProviders: ProviderObject[] = []
        const url = `${BASE_URL}3/movie/${movieId}/watch/providers?api_key=${apiKey}`
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.US && data.results.US.flatrate) {
                data.results.US.flatrate.forEach((watchProvider: Provider) => {
                watchProviders.push({
                    logo_path: watchProvider.logo_path,
                    provider_name: watchProvider.provider_name
                    })
                })
                setWatchProvidersList(watchProviders)
                }
            })
        .catch(error => {
            console.error('Error fetching watch providers:', error);
        });
        };

    useEffect(() => {
        fetchWatchProviders(movieId)
    }, [movieId, watchProvidersList])


    return (
        <div className="movie-page">
            {details && <h1> {details.original_title} </h1>}
            <div className="movie-content">
                <img className="card movie-page-poster" alt="movie cover" src={details?.poster_path === null 
                                ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                                : `http://image.tmdb.org/t/p/w185${details?.poster_path}`} />
                <div className="movie-details">
                    {details && <p> {details.tagline}</p>}
                    <h4>Description</h4>
                    {details && <p> {details.overview} min</p>}
                    <h4>Year of Release</h4>
                    {details && <p> {details.release_date.slice( 0 , 4 )}</p>}
                    <h4>Runtime</h4>
                    {details && <p> {details.runtime} min</p>}
                    <div className="watch-providers">
                        <WatchProviderIcons providers={watchProvidersList}/>
                    </div>
                    <div className={"movie-page-playlists"}>
                        {user && <h4>Add to playlist</h4>}
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
                    </div>
                </div>
            </div>
        </div>
    )
}