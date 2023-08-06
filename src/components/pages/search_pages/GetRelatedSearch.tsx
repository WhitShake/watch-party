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
    <form className="search-form" onSubmit={props.handleSubmit}>
      <div>
        <label>
        <input type="text" name="related" placeholder="Enter a Title" onChange={props.handleChange}/>
        </label>
      </div>
      <div>
        <input type="submit" value="Get Similar"></input>
      </div>
    </form>
  )
}