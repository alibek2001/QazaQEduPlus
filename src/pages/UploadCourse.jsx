import { useState } from 'react'

import { Navigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

const UploadCourse = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [status, setStatus] = useState('')
    const { role, user } = useAuth()

    if (role !== 'teacher') {
        return <Navigate to='/' />
    }

    const convertToEmbedUrl = (url) => {
        if (url.includes('watch?v=')) {
            return url.replace('watch?v=', 'embed/')
        }
        return url
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newCourse = {
                title: title.trim(),
                description: description.trim(),
                videoUrl: convertToEmbedUrl(videoUrl.trim()),
                teacherId: user.uid, // 👈 critical!
            }

            console.log('Uploading:', newCourse)

            // Validate fields
            if (!newCourse.title || !newCourse.description || !newCourse.videoUrl) {
                setStatus('Please fill all fields properly.')
                return
            }

            await addDoc(collection(db, 'courses'), newCourse)

            setStatus('✅ Course uploaded successfully!')
            setTitle('')
            setDescription('')
            setVideoUrl('')
        } catch (err) {
            console.error('❌ Firestore upload error:', err)
            setStatus(`❌ Error: ${err.message}`)
        }
    }

    return (
        <div className='max-w-xl mx-auto p-6 bg-white rounded shadow mt-6'>
            <h2 className='text-2xl font-bold mb-4'>Upload New Course</h2>
            {status && <p className='mb-2 text-green-600'>{status}</p>}
            <form onSubmit={handleSubmit} className='space-y-4'>
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
                <button type='submit' className='bg-blue-600 text-white py-2 px-4 rounded'>
                    Upload
                </button>
            </form>
        </div>
    )
}

export default UploadCourse
