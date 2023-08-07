import React from "react";
import { MovieProps } from "../prop_types/propsTypes";
import './Movie.css'


export const Movie = ({posterPath}: MovieProps) => {
  return (
      <div className="card-container">
          <div className="card">
              {posterPath === null ? <img src={'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'} alt="card" className="default"/> : <img src={`http://image.tmdb.org/t/p/w185${posterPath}`} alt="card"/>}
          </div>
      </div>
  )
}
