const AddCar = ({ onSubmit, user }) => {
  return (
    <div>
      <h1>Add Car</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="year" placeholder="Year"/>
        <input type="text" name="make" placeholder="Make"/>
        <input type="text" name="model" placeholder="Model"/>
        <input type="text" name="engine" placeholder="Engine"/>
        <input type="text" name="trim" placeholder="Trim"/>
        <input className="navButton bodyButton" type="submit" value="Add Car"/>
      </form>
    </div>
  )
}

export default AddCar