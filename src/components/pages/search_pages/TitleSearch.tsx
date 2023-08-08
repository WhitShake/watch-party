import React from "react"

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
        <input type="text" name="title" placeholder="Search for a title" onChange={props.handleChange}/>
        </label>
      </div>
  )
}