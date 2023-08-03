import React from "react"
import { Shelf } from "./Shelf"
import './SideBar.css'


type SideBarProps = {
  signedInStatus: boolean
  playlists: string[]
}

export const SideBar = (props: SideBarProps) => {
  return (
      <nav className="sidebar">
        <ul className="sidebar-elements">
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>Search</a>
          </li>
          <li>
            <Shelf playlists={props.playlists}/>
          </li>
          <li>
            <a href='#' className="login">{props.signedInStatus ? "Sign Out" : "Sign In"}</a>
          </li>
        </ul>
      </nav>
  )
}