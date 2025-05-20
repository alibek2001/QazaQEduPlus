import { useAuth } from '../context/AuthContext'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CourseDetail = () => {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [completed, setCompleted] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const fetchCourse = async () => {
            const docRef = doc(db, 'courses', id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setCourse(docSnap.data())
            }
            setLoading(false)
        }

        const fetchProgress = async () => {
            if (!user) return
            const progressRef = doc(db, 'userProgress', `${user.uid}_${id}`)
            const progressSnap = await getDoc(progressRef)
            if (progressSnap.exists()) {
                setCompleted(progressSnap.data().completed)
            }
        }

        fetchCourse()
        fetchProgress()
    }, [id, user])

    const markComplete = async () => {
        const progressRef = doc(db, 'userProgress', `${user.uid}_${id}`)
        await setDoc(progressRef, {
            userId: user.uid,
            courseId: id,
            completed: true,
        })
        setCompleted(true)
    }

    if (loading) return <p className='p-6'>Loading course...</p>
    if (!course) return <p className='p-6 text-red-600'>Course not found.</p>

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-2'>{course.title}</h2>
            <p className='mb-4 text-gray-700'>{course.description}</p>

            <div className='aspect-video mb-6'>
                <iframe
                    src={course.videoUrl}
                    title={course.title}
                    frameBorder='0'
                    allowFullScreen
                    className='w-full h-full rounded'
                />
            </div>

            {user && !completed && (
                <button onClick={markComplete} className='bg-green-600 text-white py-2 px-4 rounded'>
                    Mark as Complete
                </button>
            )}

            {user && completed && (
                <p className='text-green-600 font-semibold'>✅ You’ve completed this course!</p>
            )}
        </div>
    )
}

export default CourseDetail
