import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase_setup/firebase";
import { deleteShelfPlaylist } from "../../firestore_functions/firestore_calls";

const shelfMenuId = "shelf-menu"

type ShelfMenuProps = {
    handleDeletePlaylist: () => void
}

const shelfMenu = ({handleDeletePlaylist}: ShelfMenuProps ) => {
    const [user] = useAuthState(auth);
    const { show } = useContextMenu({
        id: shelfMenuId
    })

    const displayShelfMenu = (e: React.MouseEvent<HTMLHeadingElement>) => {
        show({
            event: e
        })
    }

    return (
        <div onContextMenu={displayShelfMenu}>
            Right click to delete playlist
        <Menu id={shelfMenuId}>
            <Item onClick={handleDeletePlaylist}>
                Delete Playlist
            </Item>
        </Menu>
        </div>
    )
}
