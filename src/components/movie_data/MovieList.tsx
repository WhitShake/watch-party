import React from 'react';
import { Movie } from './Movie'
import { MovieListProps, MovieProps } from '../prop_types/propsTypes';
import './MovieList.css';


export const MovieList = ({ movies, setRecentlyWatchedData, handleDeletion }: MovieListProps) => {
    return (
        <div className="container">
            <div className="card-display">
                {movies.map((movie: MovieProps, index: number) => (
                    <Movie 
                    key={index} 
                    id={movie.id} 
                    posterPath={movie.posterPath} 
                    setRecentlyWatchedData={setRecentlyWatchedData} 
                    handleDeletion={handleDeletion}/>
                ))}
            </div>
        </div>
    )
}