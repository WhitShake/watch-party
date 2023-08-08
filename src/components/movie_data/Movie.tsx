import React from "react";
import './Movie.css'

type MovieProps = {
    image: string
}

export const Movie = (props: MovieProps) => {
    return (
        <div className="card-container">
            <div className="card">
                {props.image === null ? <img src={'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'} alt="card" className="default"/> : <img src={`http://image.tmdb.org/t/p/w185${props.image}`} alt="card"/>}
            </div>
        </div>
    )
    }
