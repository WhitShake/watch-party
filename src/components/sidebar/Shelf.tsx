import React from "react";
import './Shelf.css'
import { Playlist } from "./Playlist";
import { AddPlaylistForm } from "./AddPlaylistForm";
import { Link } from "react-router-dom";


type ShelfProps = {
  shelf: string[]
  handleAddPlaylist: (newPlaylist: string) => void
  setCurrentPlaylist: (currentPlaylist: string) => void
}

export const Shelf = (props: ShelfProps) => {
  return (
    <div>
      <p>Your Shelf</p>
      <ul>
        {props.shelf.map((playlist, i) => {
          props.setCurrentPlaylist(playlist)
          return (
            <li className="playlist" key={i}>
              <Link to="/playlist">{playlist}</Link>
            </li>
          )
        })}
      </ul>
      <div className="playlist-form">
        <AddPlaylistForm handleAddPlaylist={props.handleAddPlaylist}/>
      </div>
    </div>
  )
};

