import React from "react"

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
    <form className="search-form" onSubmit={props.handleSubmit}>
      <div>
        <label>
        <input type="text" name="person" placeholder="Search for a person" onChange={props.handleChange}/>
        </label>
      </div>
      <div>
        <input type="submit" value="Search People"></input>
      </div>
    </form>
  )
}