import React from "react";
import './Shelf.css'
import { Playlist } from "./Playlist";
import { AddPlaylistForm } from "./AddPlaylistForm";
import { Link } from "react-router-dom";


type ShelfProps = {
  shelf: string[]
  handleAddPlaylist: (newPlaylist: string) => void
  setPlaylistTitle: (currentPlaylist: string) => void
  setPlaylistPage: (playlistPage: string) => void
}

export const Shelf = (props: ShelfProps) => {
  const populatePlaylistPage = (playlist: string) => {
    props.setPlaylistTitle(playlist)
    props.setPlaylistPage(playlist)
  }

  return (
    <div>
      <p>Your Shelf</p>
      <ul>
        {props.shelf.map((playlist, i) => {
          return (
            <li className="playlist" key={i}>
              <Link onClick={() => populatePlaylistPage(playlist)} to="/playlist">{playlist}</Link>
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

