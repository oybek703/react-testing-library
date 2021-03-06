import React, {useState} from 'react'
import {savePost} from "api"
import {Redirect} from "react-router"


function Editor() {
    const [isSaving, setIsSaving] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [error, setError] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        const {title, content, tags} = e.target.elements
        setIsSaving(true)
        savePost({
            title: title.value,
            content: content.value,
            tags: tags.value.split(', ').map(t => t.trim()),
            authorId: 'user-1',
            date: new Date().toISOString()
        }).then(() => setIsSaved(true), response => {
            setError(response.data.error)
            setIsSaving(false)
        })
    }
    if(isSaved) {
        return <Redirect to='/' />
    }
    return <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input name="title" type="text" id="title"/>

        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" cols="30" rows="10"></textarea>

        <label htmlFor="tags">Tags</label>
        <textarea name="tags" id="tags" cols="30" rows="10"></textarea>

        <button disabled={isSaving} type='submit'>Submit</button>
        {error ? <div role='alert'>{error}</div> : null}
    </form>
}

export {Editor}