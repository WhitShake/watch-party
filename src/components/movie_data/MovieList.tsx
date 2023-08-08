import React from 'react';
import { Movie } from './Movie'
import { MovieProps } from '../prop_types/propsTypes';
import './MovieList.css';

type MovieListProps = {
    movies: MovieProps[]
}



export const MovieList = (props: MovieListProps) => {
    return (
        <div className="container">
            <div className="card-display">
                {props.movies.map((movie: {id: number; posterPath: string}, index: number) => (
                    <Movie key={index} id={0} posterPath={movie.posterPath} />
                ))}
            </div>
        </div>
    )
}