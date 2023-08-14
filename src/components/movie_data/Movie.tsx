import React, { useEffect, useState } from "react";
import { MovieProps } from "../prop_types/propsTypes";
import './Movie.css'
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addMovieToPlaylist, deleteMovieOffPlaylist } from "../../firestore_functions/firestore_calls";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase_setup/firebase";

export const Movie = ({posterPath, id, setRecentlyWatchedData, handleDeletion}: MovieProps) => {
    const { title } = useParams();
    const [user] = useAuthState(auth);
    const location = useLocation();
    const [movieDeleted, setMovieDeleted] = useState(false);

    const handleMarkAsWatched = () => {
        addMovieToPlaylist(user?.uid, 'Watched', {id: id, posterPath: posterPath})
        setRecentlyWatchedData && setRecentlyWatchedData(prev => [{id: id, posterPath: posterPath}, ...prev])
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
                        {location.pathname.includes("/playlist") && <button onClick={() => {if (handleDeletion != undefined) handleDeletion(id, posterPath)}}>Remove Movie From {title}</button>}
                        <Link to= {`/movie-details/${id}`}>View More Details</Link>
                        <button onClick={handleMarkAsWatched}>Mark As Watched</button>
                        {/* <a href="#">Add Movie to Playlist</a> */}
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


