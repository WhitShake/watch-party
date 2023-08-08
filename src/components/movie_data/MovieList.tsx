import React from 'react';
import { Movie } from './Movie'

type MovieListProps = {
    movies: {
        id: number
        posterPath: string
    }[]
}



export const MovieList = (props: MovieListProps) => {
    return (
        <div className="container">
            <div className="card-display">
                {props.movies.map((movie: {id: number; posterPath: string}, index: number) => (
                    <Movie key={index} image={movie.posterPath} />
                ))}
            </div>
        </div>
    )
}