import React from "react"
import { Shelf } from "./Shelf"
import './SideBar.css'
import { Link } from "react-router-dom"



type SideBarProps = {
  signedInStatus: boolean
  playlists: string[]
}

// export const SideBar = (props: SideBarProps) => {
//   return (
//       <nav className="sidebar">
//         <ul className="sidebar-elements">
//           <li>
//             <a href='#'>Home</a>
//           </li>
//           <li>
//             <a href='#'>Search</a>
//           </li>
//           <li>
//             <Shelf playlists={props.playlists}/>
//           </li>
//           <li>
//             <a href='#' className="login">{props.signedInStatus ? "Sign Out" : "Sign In"}</a>
//           </li>
//         </ul>
//       </nav>
//   )
// }


export const SideBar = (props: SideBarProps) => {
  return (
      <nav className="sidebar">
        <ul className="sidebar-elements">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Shelf playlists={props.playlists}/>
          </li>
          <li>
            <Link to="/authentication">{props.signedInStatus ? "Sign Out" : "Sign In"}</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </nav>
  )
}