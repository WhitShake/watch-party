import React from "react";
import './Shelf.css'
import { Playlist } from "./Playlist";

type ShelfProps = {
  playlists: string[]
}

export const Shelf = (props: ShelfProps) => {
  return (
    <div>
      <p>Your Shelf: </p>
      <ul>
        {props.playlists.map((playlist, i) => {
          return (
            <li key={i}>
              <Playlist title={playlist} />
            </li>
          )
        })}
      </ul>
    </div>
  )
};

