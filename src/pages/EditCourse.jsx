// src/pages/EditCourse.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const EditCourse = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseRef = doc(db, 'courses', id)
                const courseSnap = await getDoc(courseRef)
                if (courseSnap.exists()) {
                    const course = courseSnap.data()
                    setTitle(course.title)
                    setDescription(course.description)
                    setVideoUrl(course.videoUrl)
                } else {
                    setStatus('Course not found')
                }
            } catch (err) {
                console.error(err)
                setStatus('Error loading course')
            }
        }
        fetchCourse()
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateDoc(doc(db, 'courses', id), {
                title,
                description,
                videoUrl,
            })
            setStatus('✅ Course updated successfully!')
            setTimeout(() => navigate('/teacher-dashboard'), 1500)
        } catch (err) {
            console.error(err)
            setStatus(`❌ Error: ${err.message}`)
        }
    }

    return (
        <div className='max-w-xl mx-auto p-6 bg-white shadow rounded mt-8'>
            <h2 className='text-2xl font-bold mb-4'>Edit Course</h2>
            {status && <p className='mb-2 text-blue-600'>{status}</p>}
            <form onSubmit={handleUpdate} className='space-y-4'>
                <input
                    type='text'
                    placeholder='Course Title'
                    className='w-full border p-2 rounded'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder='Description'
                    className='w-full border p-2 rounded'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='YouTube Embed URL'
                    className='w-full border p-2 rounded'
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    required
                />
                <button type='submit' className='bg-green-600 text-white py-2 px-4 rounded'>
                    Update Course
                </button>
            </form>
        </div>
    )
}

export default EditCourse
