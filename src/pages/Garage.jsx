import { useEffect, useState } from "react"
import Client from "../services/api"

const Garage = ({ user }) => {

  return(
    <div>
      <h1>Garage</h1>
      <a href="/garage/add">Add A Car</a>
    </div>
  )
}

export default Garage