import React, { useState } from 'react';
import './Playlist.css'
import { MovieList } from '../movie_data/MovieList';
import { MovieProps } from '../prop_types/propsTypes';

type PlaylistProps = {
    title: string
    movies: MovieProps[] | null
}

export const Playlist = (props: PlaylistProps) => {
    if (!props.movies) return <h1 className="playlist-container">Add some movies to {props.title}!</h1>

    return (
        <div className="playlist-container">
            <h1 className="title">{props.title}</h1>
            <MovieList movies={props.movies}/> 
        </div>
    )
}

// add routes to specific playlist page that renders according to a firebase call to fetch movies 



// use react router to link to /playlist 
// pass in the title for the header
// make a call to the firestore to populate the movies 
// render a movie list, passing in the data from the firestore call 