const NewBlog = ({handleAuthorChange, handleTitleChange, handleUrlChange, createBlog}) => {
    return(
        <div>
            <h2>Add new</h2>
            <form onSubmit={createBlog}>
                <p>title: <input onChange={handleTitleChange}></input></p>
                <p>author: <input onChange={handleAuthorChange}></input></p>
                <p>url: <input onChange={handleUrlChange}></input></p>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlog