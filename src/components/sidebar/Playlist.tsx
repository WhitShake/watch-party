import React from 'react';

type PlaylistProps = {
    title: string
}

export const Playlist = (props: PlaylistProps) => {
    return <a href='#'>{props.title}</a>
}