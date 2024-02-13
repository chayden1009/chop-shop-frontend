import { useNavigate } from "react-router-dom"
const VehicleCard = ({ car }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/garage/${car._id}`)
  }

  return(
    <div onClick={onClick}>
      <h3> {car.year} {car.make} {car.model} </h3>
    </div>
  )
}

export default VehicleCard