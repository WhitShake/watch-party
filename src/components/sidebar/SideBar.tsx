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
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            {user ? 
            <Shelf playlists={props.playlists}/>
            : "Log in to view your Shelf!"}
          </li>
          {user ? 
          (
            <li>
              <p>{auth.currentUser?.displayName}</p>
              <img src={auth.currentUser?.photoURL || ""} alt = "avatar" width="50" height="50"/>
              <button onClick={signUserOut}>Log Out</button>
              <Link to='/profile'>Profile</Link>  
            </li>
          ) : <Login />
          }
        </ul>
      </nav>
  )
}