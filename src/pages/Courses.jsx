import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const Courses = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            const querySnapshot = await getDocs(collection(db, 'courses'))
            const coursesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setCourses(coursesList)
        }
        fetchCourses()
    }, [])

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Available Courses</h2>
            <div className='grid gap-6 md:grid-cols-2'>
                {courses.map((course) => (
                    <div key={course.id} className='border rounded p-4 shadow bg-white'>
                        <h3 className='text-xl font-semibold'>{course.title}</h3>
                        <p className='text-gray-600 mb-2'>{course.description}</p>
                        <Link to={`/courses/${course.id}`} className='text-blue-600 hover:underline'>
                            View Course
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Courses
