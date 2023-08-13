import React from 'react';
import { ShelfPlaylistProps } from '../prop_types/propsTypes';
import { Link } from 'react-router-dom';
import { deleteShelfPlaylist } from '../../firestore_functions/firestore_calls';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';
import { Menu, Item, useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

export const ShelfPlaylist = ({title, setPlaylistTitle, setPlaylistPage, setShelf}: ShelfPlaylistProps) => {
    const [user] = useAuthState(auth);
    const shelfMenuId = `shelf-menu-${title}`;

    const populatePlaylistPage = (playlist: string) => {
        setPlaylistTitle(playlist)
        setPlaylistPage(playlist)
    }

    const handleDeletePlaylist = () => {
        if (title === 'Watched') {
            alert("This playlist can't be deleted!")
        } else {
            if (user) {
                deleteShelfPlaylist(user?.uid, title)
                setShelf(prev => prev.filter(playlist => playlist != title))
            }
        }
    }

    const { show } = useContextMenu({
        id: shelfMenuId
    })

    const displayMenu = (e: React.MouseEvent<HTMLElement>) => {
        show({
            event: e
        })
    }


    return (
        <li className="shelf-playlist">
            <div onContextMenu={displayMenu} >
                <Link onClick={() => populatePlaylistPage(title)} to="/playlist">{title}</Link>
            </div>
            <Menu id={shelfMenuId}>
                <Item onClick={handleDeletePlaylist}>
                Delete Playlist
                </Item>
            </Menu>
            </li>
    );
};


