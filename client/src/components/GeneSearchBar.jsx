const GeneSearchBar = (props) => {

  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        name="genesearchbar"
        value={props.searchQuery}
        placeholder="Search Genes"
        onChange={props.handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default GeneSearchBar