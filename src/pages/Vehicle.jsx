import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import Modal from 'react-modal'
import Client from "../services/api"
import IssueCard from "../components/IssueCard"
import AddIssue from "../components/AddIssue"


const Vehicle = (props) => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [car, setCar] = useState(props.car)

  const [isLoading, setLoading] = useState(true)
  
  const [deleteCarModal, showCarModal] = useState(false)
  const [issueModal, showIssueModal] = useState(false)

  const openIssueModal = () => {
    showIssueModal(true)
  }

  const closeIssueModal = () => {
    showIssueModal(false)
  }

  const openCarModal = () => {
    showCarModal(true)
  }

  const closeCarModal = () => {
    showCarModal(false)
  }

  const addIssue = async(e) => {
    e.preventDefault()
    const response = await Client.post(`/cars/${car._id}/issues`, {
      title: e.target.title.value,
      description: e.target.description.value,
      resolved: false
    })
    closeIssueModal()
    window.location.reload(false)
  }
  
  const removeCar = async(e) => {
    e.preventDefault()
    await Client.delete(`/cars/${car._id}`)
    navigate('/garage')
  }

  useEffect(() => {
    const getCar = async() => {
      const response = await Client.get(`/cars/${id}`)
      setCar(response.data[0])
      setLoading(false)
    }
    getCar()
  }, [])


  if (isLoading) {
    return(
      <div>Loading...</div>
    )
  }

  return(
    <div>
      <h2 className="vehicleTitle"> {car.year} {car.make} {car.model} </h2>

      <section>
        <h3>Issues</h3>
        {car.issues.map(issue => 
          <IssueCard key={issue._id} issue={issue} car={car}/>
          )}
      </section>

      <button onClick={openIssueModal} className="navButton bodyButton">Add Issue</button>
      <button onClick={openCarModal} className="navButton bodyButton">Delete Car</button>
      
      <Modal
        isOpen={issueModal}
        onRequestClose={closeIssueModal}
        contentLabel="Add Issue"
        ariaHideApp={false}>

        <AddIssue onSubmit={addIssue} />

      </Modal>

      <Modal
        isOpen={deleteCarModal}
        onRequestClose={closeCarModal}
        contentLabel="Confirm Delete"
        ariaHideApp={false}>

        <h3>Are you sure you want to remove your {car.make} {car.model} ?</h3>
        <button onClick={removeCar} className="navButton bodyButton">Delete</button>
        <button onClick={closeCarModal} className="navButton bodyButton">Cancel</button>

      </Modal>
    </div>
  )
}

export default Vehicle