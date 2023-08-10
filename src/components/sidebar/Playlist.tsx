import React from 'react';

type PlaylistProps = {
    title: string
}

export const Playlist = (props: PlaylistProps) => {
    return (
        <div >{props.title}</div>
    )
}

// add routes to specific playlist page that renders according to a firebase call to fetch movies 



// use react router to link to /playlist 
// pass in the title for the header
// make a call to the firestore to populate the movies 
// render a movie list, passing in the data from the firestore call 