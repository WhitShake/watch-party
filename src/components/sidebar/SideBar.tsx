import React from "react"
import { Shelf } from "./shelf"

type SideBarProps = {
  signedInStatus: boolean

}

export const SideBar = (props: SideBarProps) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>Search</a>
          </li>
          <li>
            <Shelf />
          </li>
          <li>
            <a href='#'>{props.signedInStatus ? "Sign Out" : "Sign In"}</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}