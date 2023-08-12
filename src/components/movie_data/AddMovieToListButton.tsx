import React from 'react';
import { db } from '../../firebase_setup/firebase';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import './AddMovieToListButton.css'
import { useState, useRef } from "react"

// const playlists = ['watched', 'happy movies', 'Spike Lee', "emo"]

const shelfRef = collection(db, 'users', '3rsr7exqdjb0JomRGEeXr1XZBrH2', 'Shelf');
// console.log("shelf reference:", shelfRef);
const shelfDocs = await getDocs(shelfRef);
    let playlists: string[] = []; 
    shelfDocs.forEach((doc) => {
        playlists.push(doc.id);
});

type AddMovieButtonProps = {
    handleAddMovie: (movieId: number, playlist: string) => void;
    movieId: number  

    }


export const AddMovieButton = (props: AddMovieButtonProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    console.log(open)

    const handleDropDown = (isOpen: boolean) => {
        setOpen(!isOpen)
    }
    const handleClickOutsideDropdown = (e:any) => {
        if (open && !dropDownRef.current?.contains(e.target as Node)){
            setOpen(false)
        }
    }

    window.addEventListener("click", handleClickOutsideDropdown)
    
    console.log(open, dropDownRef.current)

    return (
        <div className="AddMovieButtonContainer" ref={dropDownRef}>
            <button onClick={()=>handleDropDown(open)}>
                Add Movie to List
            </button>
            {open && (
            <ul>
                {playlists.map((playlist) => (
                    <li><button onClick={()=> props.handleAddMovie(props.movieId, playlist)}>{playlist}</button></li>
                ))}
            </ul>     
            )}
        </div>
    )

}