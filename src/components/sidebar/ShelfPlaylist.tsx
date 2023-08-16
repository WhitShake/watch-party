import React from 'react';
import { ShelfPlaylistProps } from '../prop_types/propsTypes';
import { Link } from 'react-router-dom';
import { deleteShelfPlaylist } from '../../firestore_functions/firestore_calls';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase_setup/firebase';
import { Menu, Item, useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const ShelfPlaylist = ({title, setShelf}: ShelfPlaylistProps) => {
    const [user] = useAuthState(auth);
    const shelfMenuId = `shelf-menu-${title}`;
    const location = useLocation();
    const navigate = useNavigate();

    const handleDeletePlaylist = () => {
        if (title === 'Watched') {
            alert("This playlist can't be deleted!")
        } else {
            if (user) {
                deleteShelfPlaylist(user?.uid, title)
                setShelf(prev => prev.filter(playlist => playlist !== title))
                if (location.pathname.includes(`/playlist/${title}`)) {
                    navigate("/profile");
                }
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
            <div className="clickable" onContextMenu={displayMenu} >
                <Link to={`/playlist/${title}`}>{title}</Link>
            </div>
            <Menu id={shelfMenuId}>
                <Item onClick={handleDeletePlaylist}>
                Delete Playlist
                </Item>
            </Menu>
        </li>
    );
};


