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
      <div>
        <label htmlFor="person">
        <input type="text" id="person" name="person" placeholder="Search for a person" onChange={props.handleChange}/>
        </label>
      </div>

  )
}