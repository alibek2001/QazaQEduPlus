import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const { user } = useAuth()
    const [courses, setCourses] = useState([])
    const [progress, setProgress] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            // 1. Get all courses
            const courseSnapshot = await getDocs(collection(db, 'courses'))
            const courseList = courseSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setCourses(courseList)

            // 2. Get progress for this user
            const progressData = {}
            for (const course of courseList) {
                const progressRef = doc(db, 'userProgress', `${user.uid}_${course.id}`)
                const progressSnap = await getDoc(progressRef)
                if (progressSnap.exists()) {
                    progressData[course.id] = progressSnap.data().completed
                }
            }

            setProgress(progressData)
        }

        if (user) fetchData()
    }, [user])

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Your Courses</h2>
            <div className='grid gap-6 md:grid-cols-2'>
                {courses.map((course) => {
                    const isCompleted = progress[course.id] === true
                    return (
                        <div key={course.id} className='border rounded p-4 bg-white shadow'>
                            <h3 className='text-xl font-semibold'>{course.title}</h3>
                            <p className='text-gray-600'>{course.description}</p>
                            <div className='mt-2'>
                                {isCompleted ? (
                                    <span className='text-green-600 font-medium'>✅ Completed</span>
                                ) : (
                                    <span className='text-yellow-500 font-medium'>📖 In Progress</span>
                                )}
                            </div>
                            <Link
                                to={`/courses/${course.id}`}
                                className='block mt-3 text-blue-600 hover:underline'
                            >
                                {isCompleted ? 'Review Course' : 'Continue Learning'}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Dashboard
