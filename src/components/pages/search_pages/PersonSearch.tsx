import React from "react"
import './PersonSearch.css'

type PersonSearchProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  results: {
      id: number
      posterPath: string
  }[]
}

export const PersonSearch = (props: PersonSearchProps) => {
  return (
      <div className="person-search-container">
        <label htmlFor="person">
        <input className="person-search-input" type="text" id="person" name="person" placeholder="Search for a person" onChange={props.handleChange}/>
        </label>
      </div>

  )
}