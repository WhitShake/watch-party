import { Shelf } from "./Shelf"
import './SideBar.css'
import { Link } from "react-router-dom"
import { Login } from "./Login"
import { auth } from "../../firebase_setup/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { SideBarProps } from "../prop_types/propsTypes"



export const SideBar = (props: SideBarProps) => {

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };


  return (
    <div className="sidebar-container">
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
            <Shelf shelf={props.shelf} 
                    setShelf={props.setShelf}/>

            : <span></span>}
          </li>
          {user ? 
          (
            <li className="user-signed-in">
              <div className="sidebar-user">
                <img className="sidebar-user-icon" src={props.profilePic || ""} alt = "avatar" width="50" height="50"/>
                <Link className="clickable" to='/profile'>{props.firstName} {props.lastName}</Link>  
              </div>
              <div className="side-login">
              <button className="sign-out-button" onClick={signUserOut}>LOG OUT</button>
              </div>
            </li>
          ) :<Login />
          }
        </ul>
      </nav>
    </div>
  )
}