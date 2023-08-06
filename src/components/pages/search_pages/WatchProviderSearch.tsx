import React from "react";

type WatchProviderSearchProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  results: {
      id: number
      posterPath: string
  }[]
}

export const WatchProviderSearch = (props: WatchProviderSearchProps) => {
  return (
    <form className="search-form" onSubmit={props.handleSubmit}>
      <div>
        <label>
          <input type="text" name="watch-provider" placeholder="Enter Streaming Service" onChange={props.handleChange}/>
        </label>
      </div>
      <div>
        <label>
          <input type="text" name="cast" placeholder="Enter Cast or Crew" onChange={props.handleChange}/>
        </label>
      </div>
        <fieldset name="select genre" placeholder="Genres - Select all that apply: ">
          <legend>Select Genres: </legend>
            <div>
              <input type="checkbox" id="action" name="genre" value="action" />
              <label htmlFor="action">Action</label>
            </div>
            <div>
              <input type="checkbox" id="adventure" name="genre" value="adventure" />
              <label htmlFor="adventure">Adventure</label>
            </div>
            <div>
              <input type="checkbox" id="animation" name="genre" value="animation" />
              <label htmlFor="animation">Animation</label>
            </div>
            <div>
              <input type="checkbox" id="comedy" name="genre" value="comedy" />
              <label htmlFor="comedy">Comedy</label>
            </div>
            <div>
              <input type="checkbox" id="crime" name="genre" value="crime" />
              <label htmlFor="crime">Crime</label>
            </div>
            <div>
              <input type="checkbox" id="documentary" name="genre" value="documentary" />
              <label htmlFor="documentary">Documentary</label>
            </div>
            <div>
              <input type="checkbox" id="drama" name="genre" value="drama" />
              <label htmlFor="drama">Drama</label>
            </div>
            <div>
              <input type="checkbox" id="family" name="genre" value="family" />
              <label htmlFor="family">Family</label>
            </div>
            <div>
              <input type="checkbox" id="fantasy" name="genre" value="fantasy" />
              <label htmlFor="fantasy">Fantasy</label>
            </div>
            <div>
              <input type="checkbox" id="history" name="genre" value="history" />
              <label htmlFor="history">History</label>
            </div>
            <div>
              <input type="checkbox" id="horror" name="genre" value="horror" />
              <label htmlFor="horror">Horror</label>
            </div>
            <div>
              <input type="checkbox" id="music" name="genre" value="music" />
              <label htmlFor="music">Music</label>
            </div>
            <div>
              <input type="checkbox" id="mystery" name="genre" value="mystery" />
              <label htmlFor="mystery">Mystery</label>
            </div>
            <div>
              <input type="checkbox" id="romance" name="genre" value="romance" />
              <label htmlFor="romance">Romance</label>
            </div>
            <div>
              <input type="checkbox" id="science fiction" name="genre" value="science fiction" />
              <label htmlFor="science fiction">Science Fiction</label>
            </div>
            <div>
              <input type="checkbox" id="tv movie" name="genre" value="tv movie" />
              <label htmlFor="tv movie">TV Movie</label>
            </div>
            <div>
              <input type="checkbox" id="thriller" name="genre" value="thriller" />
              <label htmlFor="thriller">Thriller</label>
            </div>
            <div>
              <input type="checkbox" id="war" name="genre" value="war" />
              <label htmlFor="war">War</label>
            </div>
            <div>
              <input type="checkbox" id="western" name="genre" value="western" />
              <label htmlFor="western">Western</label>
            </div>
        </fieldset>
      <div>
        <input type="submit" value="Search Movies"></input>
      </div>
    </form>
  )
}