import React from "react";
import './Shelf.css'
import { Playlist } from "./Playlist";
import { AddPlaylistForm } from "./AddPlaylistForm";


type ShelfProps = {
  playlists: string[]
  handleAddPlaylist: (newPlaylist: string) => void
}

export const Shelf = (props: ShelfProps) => {
  return (
    <div>
      <p>Your Shelf</p>
      <ul>
        {props.playlists.map((playlist, i) => {
          return (
            <li className="playlist" key={i}>
              <Playlist title={playlist} />
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

