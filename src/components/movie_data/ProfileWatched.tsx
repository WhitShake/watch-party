import React from 'react';
import { Movie } from './Movie'
import { MovieProps } from '../prop_types/propsTypes';
import './MovieList.css';
import './ProfileWatched.css'

type ProfileWatchedProps = {
    movies: MovieProps[]
}


export const ProfileWatched = (props: ProfileWatchedProps) => {
    return (
        // <div className="watched-container">
            <div className="watched-display">
                {props.movies.map((movie: {id: number; posterPath: string}, index: number) => (
                    <Movie key={index} id={movie.id} posterPath={movie.posterPath} />
                ))}
            </div>
        // </div>
    )
}




// import React from 'react';
// import { Movie } from './Movie'
// import { MovieProps } from '../prop_types/propsTypes';
// import './ProfileWatched.css'
// import './MovieList.css';

// type ProfileWatchedProps = {
//     movies: MovieProps[]
// }

// export const ProfileWatched = (props: ProfileWatchedProps) => {
//   return (
//     <div className="watched-container">
//         <div className="watched-display">
//             {props.movies.map((movie: {id: number; posterPath: string}, index: number) => (
//                 <Movie key={index} id={0} posterPath={movie.posterPath} />
//             ))}
//         </div>
//     </div>
// )
// }