import React from 'react';
import './Playlist.css'

type PlaylistProps = {
    title: string
}

export const Playlist = (props: PlaylistProps) => {
    return (
        <div className="playlist-container">
            <h1 className="title">{props.title}</h1>
        </div>
    )
}

// add routes to specific playlist page that renders according to a firebase call to fetch movies 



// use react router to link to /playlist 
// pass in the title for the header
// make a call to the firestore to populate the movies 
// render a movie list, passing in the data from the firestore call 