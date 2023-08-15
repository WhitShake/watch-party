import React from "react"
import './TitleSearch.css'

type TitleSearchProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  results: {
      id: number
      posterPath: string
  }[]
}

export const TitleSearch = (props: TitleSearchProps) => {
  return (
      <div className="title-search-container">
        <label>
        <input type="text" className="title-search-input" name="title" placeholder="Search for a title" onChange={props.handleChange}/>
        </label>
      </div>
  )
}