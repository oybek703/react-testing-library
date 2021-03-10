import React, {useState} from 'react'


function Editor() {
    const [isSaving, setIsSaving] = useState(false)
    function handleSubmit(e) {
        e.preventDefault()
        setIsSaving(true)
    }
    return <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title"/>

        <label htmlFor="content">Content</label>
        <textarea id="content" cols="30" rows="10"></textarea>

        <label htmlFor="tags">Tags</label>
        <textarea id="tags" cols="30" rows="10"></textarea>

        <button disabled={isSaving}>Submit</button>
    </form>
}

export {Editor}