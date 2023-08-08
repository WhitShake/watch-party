import React from 'react';
import { MovieList } from '../../movie_data/MovieList';
// import { Movie } from '../../movie_data/Movie';
import { TitleSearch } from './TitleSearch';
import { PersonSearch } from './PersonSearch';
import { GetRelatedSearch } from './GetRelatedSearch';
import { WatchProviderSearch } from './WatchProviderSearch';
import './Search.css'

type SearchProps = {
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    handleSearchSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedSearchForm: string
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
                    <select name="select type" onChange={props.handleSearchSelection} value={props.selectedSearchForm}>
                        <option value="placeholder">Select Search Option</option>
                        <option value="title">Search by Title</option>
                        <option value="person">Search by Person</option>
                        <option value="related">Search for Similar</option>
                        <option value="watch-provider">Search by Streaming Service/Advanced</option>
                    </select>
                </div>
                <div>
                    <div>
                    {props.selectedSearchForm === 'title' && (
                        <>
                        <TitleSearch
                            handleChange={props.handleChange}
                            handleSubmit={props.handleSubmit}
                            results={props.results}
                        />
                        </>
                    )}
                    </div>
                    <div>
                    {props.selectedSearchForm === 'person' && (
                        <>
                        <PersonSearch
                            handleChange={props.handleChange}
                            handleSubmit={props.handleSubmit}
                            results={props.results}
                        />
                        </>
                    )}
                    </div>
                    <div>
                        {props.selectedSearchForm === 'related' && (
                        <>
                        <GetRelatedSearch 
                            handleChange={props.handleChange} 
                            handleSubmit={props.handleSubmit} 
                            results={props.results} 
                        />
                        </>
                    )}
                    </div>
                    {props.selectedSearchForm === 'watch-provider' && (
                    <WatchProviderSearch handleChange={props.handleChange} handleSubmit={props.handleSubmit} results={props.results} />
                    )}
                    <button type="submit" value="Search People">
                            Search for Movies
                    </button>
                </div>
            </form>
            <MovieList movies={props.results}/>
        </div>
    )
};


// return (
//     <div className="search">
//         <form className="search-form" onSubmit={props.handleSubmit}>
//             <h1>Search Form</h1>
//             <div>
//                 <label htmlFor="title search">Title: </label>
//                 <input type="text" name="title" placeholder="Search for a title" onChange={props.handleChange}/>
//             </div>
//             <div>
//                 <input type="submit" value="Search for movie"/>
//             </div>
//             <div>{props.results.length > 0 && <MovieList movies={props.results} />}</div>
//         </form>
//     </div>
// )