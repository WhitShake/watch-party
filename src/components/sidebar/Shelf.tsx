import React from "react";
import './Shelf.css'
import { Playlist } from "../pages/Playlist";
import { AddPlaylistForm } from "./AddPlaylistForm";
import { Link } from "react-router-dom";
import { ShelfProps } from "../prop_types/propsTypes";
import { ShelfPlaylist } from "./ShelfPlaylist";


export const Shelf = (props: ShelfProps) => {
  const populatePlaylistPage = (playlist: string) => {
    props.setPlaylistTitle(playlist)
    props.setPlaylistPage(playlist)
  }

  return (
    <div className="shelf-container">
      <p>Your Shelf</p>
      <ul>
        {props.shelf.map((playlist, i) => {
          return (
            // <li className="playlist" key={i}>
            //   <Link onClick={() => populatePlaylistPage(playlist)} to="/playlist">{playlist}</Link>
            // </li>
            <ShelfPlaylist key={i} title={playlist} setPlaylistPage={props.setPlaylistPage} setPlaylistTitle={props.setPlaylistTitle} setShelf={props.setShelf}/>
          )
        })}
      </ul>
      <div className="playlist-form">
        <AddPlaylistForm setShelf={props.setShelf}/>
      </div>
    </div>
  )
};

