import React from "react"

type ProductionSearchProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  results: {
      id: number
      posterPath: string
    }[]
}

export const ProductionSearch = (props: ProductionSearchProps) => {
  return (
    <form className="search-form" onSubmit={props.handleSubmit}>
      <div>
        <label>
        <input type="text" name="production" placeholder="Search by Production Company" onChange={props.handleChange}/>
        </label>
      </div>
      <div>
        <input type="submit" value="Search Producers"></input>
      </div>
    </form>
  )
}