import React from "react";
import './Shelf.css'
import { AddPlaylistForm } from "./AddPlaylistForm";
import { ShelfProps } from "../prop_types/propsTypes";
import { ShelfPlaylist } from "./ShelfPlaylist";


export const Shelf = (props: ShelfProps) => {

  return (
    <div className="shelf-container">
      <p>Your Shelf</p>
      <ul>
        {props.shelf.map((playlist, i) => {
          return (
            <ShelfPlaylist key={i} title={playlist} setShelf={props.setShelf}/>
          )
        })}
      </ul>
      <div className="playlist-form">
        <AddPlaylistForm setShelf={props.setShelf}/>
      </div>
    </div>
  )
};

