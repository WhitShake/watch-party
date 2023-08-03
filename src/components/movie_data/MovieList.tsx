import React from 'react';
import { Movie } from './Movie'

type MovieListProps = {
    movies: string[]
}

export const MovieList = (props: MovieListProps) => {
  return (
      <div className="container">
          <div className="card-display">
              {props.movies.map((movie, index) => (
                  <Movie key={index} image={movie} />
              ))}
          </div>
      </div>
  )
}