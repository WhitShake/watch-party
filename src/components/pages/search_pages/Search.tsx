import React from 'react';
import { MovieList } from '../../movie_data/MovieList';
import { TitleSearch } from './TitleSearch';
import { PersonSearch } from './PersonSearch';
import { GetRelatedSearch } from './GetRelatedSearch';
import './Search.css'
import { SearchProps } from '../../prop_types/propsTypes';


export const Search = (props: SearchProps) => {

    return (
        <div className="search">
            <div className='all-encompassing-search-container'>
            <form className="main-search-form" onSubmit={props.handleSubmit}>
                <div className='main-search-inputs'>
                    <h1 className='search-title'>Search Movies By:</h1>
                    <div className="form-selector">
                        <label htmlFor="title search"></label>
                        <select className="dropdown-btn" name="select type" onChange={props.handleSearchSelection} value={props.selectedSearchForm}>
                            <option className="search-option" value="placeholder">Select Option</option>
                            <option className="search-option" value="title">Title</option>
                            <option className="search-option" value="person">Person</option>
                            <option className="search-option" value="related">Similar</option>
                        </select>
                    </div>
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
                </div>
            </form>
            <MovieList movies={props.results} setRecentlyWatchedData={props.setRecentlyWatchedData}/>
            </div>
        </div>
    )
};


