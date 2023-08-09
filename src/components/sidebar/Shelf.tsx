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
            <li key={i}>
              <Playlist title={playlist} />
            </li>
          )
        })}
      </ul>
      <AddPlaylistForm handleAddPlaylist={props.handleAddPlaylist}/>
    </div>
  )
};

