import React from 'react';
import { MovieList } from '../../movie_data/MovieList';
import { TitleSearch } from './TitleSearch';
import { PersonSearch } from './PersonSearch';
import { GetRelatedSearch } from './GetRelatedSearch';
import { AdvancedSearch } from './Advanced';
import './Search.css'
import { SearchProps } from '../../prop_types/propsTypes';


export const Search = (props: SearchProps) => {


    return (
        <div className="search">
            <form className="search-form" onSubmit={props.handleSubmit}>
                <h1>Search By:</h1>
                <div className="form-selector">
                    <label htmlFor="title search"></label>
                    <select className="dropdown-btn" name="select type" onChange={props.handleSearchSelection} value={props.selectedSearchForm}>
                        <option value="placeholder">Select Search Option</option>
                        <option value="title">Search by Title</option>
                        <option value="person">Search by Person</option>
                        <option value="related">Search for Similar</option>
                        <option value="watch-provider">Advanced Search</option>
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
                    <AdvancedSearch handleChange={props.handleChange} handleSubmit={props.handleSubmit} results={props.results} />
                    )}
                    <button className="search-button" type="submit" value="Search People">
                            Search for Movies
                    </button>
                </div>
            </form>
            <MovieList movies={props.results} setRecentlyWatchedData={props.setRecentlyWatchedData}/>
        </div>
    )
};


