import { useNavigate } from "react-router-dom"
const VehicleCard = ({ car }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/garage/${car._id}`)
  }

  let openTickets = 0

  car.issues.map(issue => {
    if (!issue.resolved) {
      openTickets++
    }
  })

  return(
    <div onClick={onClick} className="card">
      <h3> {car.year} {car.make} {car.model} </h3>
      <ul>
        <li>Condition: {openTickets} {openTickets > 1 ? 'Issues' : 'Issue'}</li>
      </ul>
    </div>
  )
}

export default VehicleCard