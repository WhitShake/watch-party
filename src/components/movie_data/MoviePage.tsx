import React, { useEffect, useState } from 'react';
import './MoviePage.css'
import { useParams } from 'react-router-dom';
import { addMovieToPlaylist } from '../../firestore_functions/firestore_calls';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';
import { MovieProps, MoviePageProps, MovieDetails, ProviderObject, Provider } from '../prop_types/propsTypes';
import { WatchProviderIcons } from '../home - randomizer/WatchProviderIcons';
import { providerInfo } from './WatchProvidersInfo';
import { PosterPathFiller } from './PosterPathFiller';

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

    const fetchTitle = (id: number) => {
        const url = `${BASE_URL}3/movie/${id}?api_key=${apiKey}&language=en-US`
        console.log(url)
        
        return fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log("data:", data)
                if (data.original_title) {
                    console.log("original_title:", data.original_title)
                return data.original_title;
                }
                // return null;
            });
    }

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
                    if (watchProvider.provider_id in providerInfo) {
                        const path = providerInfo[watchProvider.provider_id]
                        watchProviders.push({
                            logo_path: watchProvider.logo_path,
                            provider_name: watchProvider.provider_name,
                            path: path
                        })
                    }
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
                    {details?.poster_path === null ? (
                        <div className='poster-filler-container'>
                            <PosterPathFiller 
                                filmId={movieId}
                                fetchTitle={fetchTitle}/>
                        </div>
                    ) : (
                        <img className="movie-page-poster" alt="movie cover" src={`http://image.tmdb.org/t/p/w185${details?.poster_path}`} />
                    )}
                <div className="movie-details">
                    <div className='facts-add-playlist'>
                        <div className='movie-facts-container'>
                            {details && <p className='tagline'> {details.tagline}</p>}
                            <h4 className='info-header'>Overview: </h4>
                            {details && <p className='overview'> {details.overview}</p>}
                            <div className='specs'>
                                    <h5 className='line-info'>Released:</h5>
                                    {details && <p className='release-date'> {details.release_date.slice( 0 , 4 )}</p>}
                                    <h5 className='line-info'>Runtime:</h5>
                                    {details && <p className='runtime'> {details.runtime} min</p>}
                                </div>
                        </div>
                        <div className="add-to-playlists-container">
                            {user && <h4>Add to playlist: </h4>}
                            <div className="movie-page-playlists">
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
                    <div className="watch-providers">
                        <WatchProviderIcons providers={watchProvidersList}/>
                    </div>
                </div>
            </div>
            <footer></footer>
        </div>
    )
}