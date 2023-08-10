// import React from 'react';
// import { Movie } from './Movie'
// import { MovieProps } from '../prop_types/propsTypes';
// import './MovieList.css';

// type MovieListProps = {
//     movies: MovieProps[]
// }



// export const MovieList = (props: MovieListProps) => {
//     return (
//         <div className="container">
//             <div className="card-display">
//                 {props.movies.map((movie: {id: number; posterPath: string}, index: number) => (
//                     <Movie key={index} id={0} posterPath={movie.posterPath} />
//                 ))}
//             </div>
//         </div>
//     )
// }

import React from 'react';
import { Movie } from './Movie'
import { MoviePage } from '../pages/MoviePage';
import { useNavigate } from 'react-router-dom';

type MovieListProps = {
    movieDetails: {
        id: number; 
        posterPath: string; 
        details: string; 
        title: string; 
        runtime: number; 
        releaseDate: string; 
        genres: {id: number; name: string}[]
      };
    handleMovieClick: (movieId: number) => void;
    movies: {
        id: number
        posterPath: string
    }[]

}

export const MovieList = (props: MovieListProps) => {
    const navigate = useNavigate();
    const navToMoviePage = (movieId: number) =>{
        props.handleMovieClick(movieId)
        navigate('/moviepage', {state: { data: props.movieDetails }});

    }
    return (
        <div className="container">
            <div className="card-display">
                {props.movies.map((movie: {id: number; posterPath: string}, index: number) => (
                    <button onClick={() => navToMoviePage(movie.id)}><Movie key={index} id={movie.id} posterPath={movie.posterPath} /></button>
                ))}
            </div>
            {/* <div className="movie-details">
                {props.movieDetails && props.movieDetails.id > 0 && <MoviePage movieDetails={props.movieDetails}/>}
            </div> */}
        </div>
    )
}