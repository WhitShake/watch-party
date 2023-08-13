import React from "react";
import { MovieProps } from "../prop_types/propsTypes";
import './Movie.css'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Movie = ({posterPath, id}: MovieProps) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/movie-details")
    }

    return (
            <div className="movie-container">
                {/* <button className="dot-button">...</button> */}
                <div className="dropdown">
                    <div className="dropdown-button">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="dropdown-content">
                        {/* <button onClick={handleClick}>View More Details</button> */}
                        <Link to= {`/movie-details/${id}`}>View More Details</Link>
                        <a href="#">Mark As Watched</a>
                        <a href="#">Add Movie to Playlist</a>
                    </div>
                </div>
                <img className="card" alt="movie cover" src={posterPath === null 
                ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                : `http://image.tmdb.org/t/p/w185${posterPath}`} />
            </div>
    )
}


// import React from "react";
// import { MovieProps } from "../prop_types/propsTypes";
// import './Movie.css'

// export const Movie = ({posterPath, id}: MovieProps) => {
    


//     return (
//         <div className="card-container">
//             <div>
//                 <img className="card" src={posterPath === null 
//                 ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
//                 : `http://image.tmdb.org/t/p/w185${posterPath}`} />
//             </div>
//             <p>{id}</p>
//         </div>
//     )
// }


