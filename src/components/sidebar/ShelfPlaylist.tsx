import React from 'react';
import { ShelfPlaylistProps } from '../prop_types/propsTypes';
import { Link } from 'react-router-dom';

export const ShelfPlaylist = ({title, setPlaylistTitle, setPlaylistPage}: ShelfPlaylistProps) => {
    const populatePlaylistPage = (playlist: string) => {
        setPlaylistTitle(playlist)
        setPlaylistPage(playlist)
    }

    return (
        <li className="playlist">
            <Link onClick={() => populatePlaylistPage(title)} to="/playlist">{title}</Link>
        </li>
    )
}