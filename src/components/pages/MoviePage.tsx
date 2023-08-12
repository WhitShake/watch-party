import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MoviePage.css'
import { AddMovieButton } from '../movie_data/AddMovieToListButton';

type MoviePageProps = {
    // handleMovieClick: (movieId: number) => void;
    movieDetails: {
        id: number; 
        posterPath: string; 
        details: string; 
        title: string; 
        runtime: number; 
        releaseDate: string; 
        genres: {id: number; name: string}[]
      }
    handleAddMovie: (movieId: number, playlist: string) => void;  
};

export const MoviePage = (props: MoviePageProps) => {
    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
    console.log(props.movieDetails)

    return (
        <div className="moviePage">
            {props.movieDetails.id >1 ? 
            <div className="container">
            {/* <button onClick={() => props.handleMovieClick(346698)}>Click Me</button> */}
                <div className="item">
                    {props.movieDetails.posterPath === null ? <img src={'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'} alt="card" className="default"/> : <img src={`http://image.tmdb.org/t/p/w185${props.movieDetails.posterPath}`} alt="card"/>}
                </div>
                <div className="item">
                    <h3> Title: {props.movieDetails.title}</h3>
                    <h3> Runtime: {props.movieDetails.runtime} min</h3>
                    <h3> Year of release: {props.movieDetails.releaseDate.slice( 0 , 4 )}</h3>
                    <h3> Description: {props.movieDetails.details}</h3>
                    <button onClick={goBack}>Back</button>	
                    <AddMovieButton movieId={props.movieDetails.id} handleAddMovie={props.handleAddMovie}></AddMovieButton>
                </div>
            </div>
            : <div>Something went wrong. Please go back and try again. </div>}
        </div>

    )

}