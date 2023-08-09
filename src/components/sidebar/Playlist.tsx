import React from 'react';

type PlaylistProps = {
    title: string
}

export const Playlist = (props: PlaylistProps) => {
    return <a href='#'>{props.title}</a>
}

// add routes to specific playlist page that renders according to a firebase call to fetch movies 