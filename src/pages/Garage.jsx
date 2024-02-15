import { useEffect, useState } from "react"
import Modal from 'react-modal'
import Client from "../services/api"
import AddCar from "../components/AddCar"
import VehicleCard from "../components/VehicleCard"

const Garage = ({ user }) => {

  const [modal, showModal] = useState(false)
  const [cars, setCars] = useState([])

  const openModal = () => {
    showModal(true)
  }

  const closeModal = () => {
    showModal(false)
  }

  const createCar = async (event) => {
    event.preventDefault()
    const response = await Client.post('/cars', 
      {
        year: event.target.year.value,
        make: event.target.make.value,
        model: event.target.model.value,
        engine: event.target.engine.value,
        trim: event.target.trim.value,
        issues: [],
        user: user.id,
      }
    )
    closeModal()
    window.location.reload(false)
  }

  useEffect(() => {
    const getCars = async() => {
      try {
        const response = await Client.get('/cars')
        setCars(response.data)
      } catch (error) {
        throw error
      }
    }
    getCars()
  }, [user])


  return(
    <div>
      <h1>Garage</h1>
      <div className="cardContainer">
      { cars.map(car => (
        <VehicleCard key={car._id} car={car} />
      ))}
      </div>
      <button onClick={openModal} className="navButton bodyButton">Add New Car</button>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        contentLabel="Add Car"
        ariaHideApp={false}
      >
        <AddCar onSubmit={createCar} user={user} />
      </Modal>
    </div>
  )
}

export default Garage