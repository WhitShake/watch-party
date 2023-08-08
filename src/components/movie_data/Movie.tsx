import React from "react";
import { MovieProps } from "../prop_types/propsTypes";
import './Movie.css'

export const Movie = ({posterPath}: MovieProps) => {
    return (
        <div className="card-container">
            <div>
                <img className="card" src={posterPath === null 
                ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                : `http://image.tmdb.org/t/p/w185${posterPath}`} />
            </div>
        </div>
    )
}


