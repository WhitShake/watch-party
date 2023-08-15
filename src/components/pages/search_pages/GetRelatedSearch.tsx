import React from "react"
import './GetRelatedSearch.css'

type GetRelatedSearchProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  results: {
      id: number
      posterPath: string
  }[]
}

export const GetRelatedSearch = (props: GetRelatedSearchProps) => {
  return (
    <div>
      <div className="get-related-search-container">
        <label htmlFor="related">
        <input className="get-related-search-input" type="text" id="related" name="related" placeholder="Enter a Title" onChange={props.handleChange}/>
        </label>
      </div>
    </div>
  )
}