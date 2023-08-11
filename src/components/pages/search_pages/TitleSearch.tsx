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
      <div>
        <label>
        <input type="text" className="search-input" name="title" placeholder="Search for a title" onChange={props.handleChange}/>
        </label>
      </div>
  )
}