const AddIssue = ({ onSubmit }) => {
  return(
    <form onSubmit={onSubmit} >
      <input type="text" name="title" placeholder="title" />
      <input type="text" name="description" placeholder="description" />
      <input type="submit" value="Add Issue" />
    </form>
  )
}

export default AddIssue