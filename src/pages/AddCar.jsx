const AddCar = ({ onSubmit, user }) => {
  return (
    <div>
      <h1>Add Car</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="year"/>
        <input type="text" name="make"/>
        <input type="text" name="model"/>
        <input type="text" name="engine"/>
        <input type="text" name="trim"/>
        <input type="submit" value="Add Car"/>
      </form>
    </div>
  )
}

export default AddCar