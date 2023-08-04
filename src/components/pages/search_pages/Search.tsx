import React from 'react';
import { MovieList } from '../../movie_data/MovieList';
import { Movie } from '../../movie_data/Movie';
import './Search.css'

type SearchProps = {
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    results: {
        id: number
        posterPath: string
    }[]
}

export const Search = (props: SearchProps) => {


    return (
        <div className="search">
            <form className="search-form" onSubmit={props.handleSubmit}>
                <h1>Search Form</h1>
                <div>
                    <label htmlFor="title search">Title: </label>
                    <input type="text" name="title" placeholder="Search for a title" onChange={props.handleChange}/>
                </div>
                <div>
                    <input type="submit" value="Search for movie"/>
                </div>
                <div>{props.results.length > 0 && <MovieList movies={props.results} />}</div>
            </form>
        </div>
    )
};