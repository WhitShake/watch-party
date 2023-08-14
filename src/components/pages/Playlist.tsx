import React, { useState } from 'react';
import './Playlist.css'
import { MovieList } from '../movie_data/MovieList';
import { MovieProps, PlaylistProps } from '../prop_types/propsTypes';


export const Playlist = (props: PlaylistProps) => {

    return (
        <div className="playlist-container">
            <h1 className="title">{props.title}</h1>
            {props.movies && props.movies.length !== 0
            ? <MovieList movies={props.movies} setRecentlyWatchedData={props.setRecentlyWatchedData} />
            : <h2 className="message">Add movies to this playlist!</h2>
            }
        </div>
    )
}

// add routes to specific playlist page that renders according to a firebase call to fetch movies 



// use react router to link to /playlist 
// pass in the title for the header
// make a call to the firestore to populate the movies 
// render a movie list, passing in the data from the firestore call 