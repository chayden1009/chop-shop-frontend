import { useNavigate } from "react-router-dom"
const VehicleCard = ({ car }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/garage/${car._id}`)
  }

  return(
    <div onClick={onClick} className="card">
      <h3> {car.year} {car.make} {car.model} </h3>
      <ul>
        <li>Condition: {car.issues.length} issues</li>
      </ul>
    </div>
  )
}

export default VehicleCard