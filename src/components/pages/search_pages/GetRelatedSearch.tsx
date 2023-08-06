import React from "react"

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
      <div>
        <label htmlFor="related">
        <input type="text" id="related" name="related" placeholder="Enter a Title" onChange={props.handleChange}/>
        </label>
      </div>
    </div>
  )
}