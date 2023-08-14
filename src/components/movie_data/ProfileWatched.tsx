import { Movie } from './Movie'
import { ProfileWatchedProps } from '../prop_types/propsTypes';
import './MovieList.css';
import './ProfileWatched.css'


export const ProfileWatched = (props: ProfileWatchedProps) => {
    return (
            <div className="profile-watched-display">
                {props.movies.map((movie: {id: number; posterPath: string}, index: number) => (
                    <Movie key={index} id={movie.id} posterPath={movie.posterPath} setRecentlyWatchedData={props.setRecentlyWatchedData}/>
                ))}
            </div>
    );
};