import React from 'react';
import { ShelfPlaylistProps } from '../prop_types/propsTypes';
import { Link } from 'react-router-dom';

export const ShelfPlaylist = ({title, setPlaylistTitle, setPlaylistPage,}: ShelfPlaylistProps) => {
    const populatePlaylistPage = (playlist: string) => {
        setPlaylistTitle(playlist)
        setPlaylistPage(playlist)
    }

    const handleDeletePlaylist = () => {
        // firestore deletion
        // set state 
    }

    return (
        <li className="shelf-playlist">
            <button></button>
            <Link onClick={() => populatePlaylistPage(title)} to="/playlist">{title}</Link>
        </li>
    )
}