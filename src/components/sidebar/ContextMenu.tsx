import {
    Menu,
    Item,
    useContextMenu
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

const shelfMenuId = "shelf-menu"

type ShelfMenuProps = {
    handleDeletePlaylist: () => void
}

export const shelfMenu = ({handleDeletePlaylist}: ShelfMenuProps ) => {
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
