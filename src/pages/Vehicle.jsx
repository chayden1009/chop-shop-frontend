import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Modal from 'react-modal'
import Client from "../services/api"
import IssueCard from "../components/IssueCard"
import AddIssue from "../components/AddIssue"

const Vehicle = ({ user }) => {
  const { id } = useParams()

  const [car, setCar] = useState({})
  const [issues, setIssues] = useState([])
  const [modal, showModal] = useState(false)

  const openModal = () => {
    showModal(true)
  }

  const closeModal = () => {
    showModal(false)
  }

  const addCar = async(e) => {
    e.preventDefault()
    const response = await Client.post(`/cars/${car._id}/issues`, {
      title: e.target.title.value,
      description: e.target.description.value,
      resolved: false
    })
    console.log(response.data)
  }

  useEffect(() => {
    const getCar = async() => {
      const response = await Client.get(`/cars/${id}`)
      setCar(response.data[0])
    }
    const getIssues = async() => {
      await getCar()
      const issues = car.issues
      setIssues(issues)
    }
    getIssues()
  }, [])

  return(
    <div>
      <h1> {car.year} {car.make} {car.model} </h1>
      {issues ? (
        <div>
          {issues.map(issue => (
            <IssueCard issue={issue} />
          ))}
        </div>
      ) : (null)}
      <button onClick={openModal}>Add Issue</button>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        contentLabel="Add Issue"
      >
        <AddIssue onSubmit={addCar} />
      </Modal>
    </div>
  )
}

export default Vehicle