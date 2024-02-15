const AddIssue = ({ onSubmit }) => {
  return(
    <form onSubmit={onSubmit} >
      <input type="text" name="title" placeholder="title" />
      <textarea type="text" name="description" placeholder="description" className="textBox"/>
      <input type="submit" value="Add Issue" className="navButton bodyButton"/>
    </form>
  )
}

export default AddIssue