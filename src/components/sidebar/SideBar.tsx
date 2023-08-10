import React from "react"
import { Shelf } from "./Shelf"
import './SideBar.css'
import { Link } from "react-router-dom"
import { Login } from "./Login"
import { auth } from "../../firebase_setup/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom"



type SideBarProps = {
  signedInStatus: boolean
  playlists: string[]
  firstName: string | undefined
  lastName: string | undefined
  handleAddPlaylist: (newPlaylist: string) => void
}

export const SideBar = (props: SideBarProps) => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
      <nav className="sidebar">
        <ul className="sidebar-elements">
          <li className="clickable">
            <Link to="/">Home</Link>
          </li>
          <li className="clickable">
            <Link to="/search">Search</Link>
          </li>
          <li className="shelf">
            {user ? 
            <Shelf playlists={props.playlists} handleAddPlaylist={props.handleAddPlaylist}/>
            : "Log in to view your Shelf!"}
          </li>
          {user ? 
          (
            <li className="user-signed-in">
              <div className="sidebar-user clickable">
                <img className="sidebar-user-icon" src={auth.currentUser?.photoURL || ""} alt = "avatar" width="50" height="50"/>
                <Link to='/profile'>{props.firstName} {props.lastName}</Link>  
                {/* <p>{props.firstName} {props.lastName}</p> */}
              </div>
              <button className="log-out-button" onClick={signUserOut}>Log Out</button>
            </li>
          ) : <Login />
          }
        </ul>
      </nav>
  )
}