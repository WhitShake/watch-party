import React from 'react';
import { ShelfPlaylistProps } from '../prop_types/propsTypes';
import { Link } from 'react-router-dom';
import { deleteShelfPlaylist } from '../../firestore_functions/firestore_calls';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';

export const ShelfPlaylist = ({title, setPlaylistTitle, setPlaylistPage, setShelf}: ShelfPlaylistProps) => {
    const [user] = useAuthState(auth);

    const populatePlaylistPage = (playlist: string) => {
        setPlaylistTitle(playlist)
        setPlaylistPage(playlist)
    }

    const handleDeletePlaylist = () => {
        if (user) {
            deleteShelfPlaylist(user?.uid, title)
            setShelf(prev => prev.filter(playlist => playlist != title))
        }
    }

    return (
        <li className="shelf-playlist">
            <button onClick={handleDeletePlaylist}>Delete {title}</button>
            <Link onClick={() => populatePlaylistPage(title)} to="/playlist">{title}</Link>
        </li>
    )
}