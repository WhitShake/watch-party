import React, { useState, useEffect } from 'react'

type ContextMenuProps = {
    title: string
}

export const ShelfContextMenu = ({ title }: ContextMenuProps) => {
    const [showMenu, setShowMenu] = useState(false)
    const [x, setX] = useState('')
    const [y, setY] = useState('')

    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault()
        setX(`${event.pageX}px`)
        setY(`${event.pageY}px`)
        setShowMenu(true)
    }

    const handleClick = () => {
        showMenu && setShowMenu(false)
    }

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu)
        document.removeEventListener('click', handleClick)
    })

    return showMenu ? (
        <ul className="context-menu" style={{ top: y, left: x}} >
            <li>Delete {title}</li>
        </ul>
    ) : null
}
