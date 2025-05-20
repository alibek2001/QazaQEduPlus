// src/pages/TeacherDashboard.jsx
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import AuthContext from '../context/AuthContext'

const TeacherDashboard = () => {
    const { user, role } = useAuth()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user) return

            try {
                console.log('Fetching courses for teacher UID:', user.uid)

                const q = query(collection(db, 'courses'), where('teacherId', '==', user.uid))
                const querySnapshot = await getDocs(q)

                const coursesData = await Promise.all(
                    querySnapshot.docs.map(async (docSnap) => {
                        const courseData = { id: docSnap.id, ...docSnap.data() }

                        const progressQuery = query(
                            collection(db, 'userProgress'),
                            where('courseId', '==', courseData.id),
                            where('completed', '==', true),
                        )
                        const progressSnap = await getDocs(progressQuery)
                        courseData.completedCount = progressSnap.size

                        return courseData
                    }),
                )

                console.log('Courses found:', coursesData)
                setCourses(coursesData)
            } catch (error) {
                console.error('Error fetching teacher courses:', error)
            }
        }

        fetchCourses()
    }, [user])

    const handleDelete = async (courseId) => {
        try {
            await deleteDoc(doc(db, 'courses', courseId))
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId))
        } catch (error) {
            console.error('Error deleting course:', error)
        }
    }

    if (!user || role !== 'teacher') {
        return <Navigate to='/' />
    }

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Your Courses</h2>

            <Link to='/upload' className='inline-block bg-blue-600 text-white px-4 py-2 rounded mb-6'>
                + Upload New Course
            </Link>

            {courses.length === 0 ? (
                <p className='text-gray-500'>No courses found.</p>
            ) : (
                <ul className='space-y-6'>
                    {courses.map((course) => (
                        <li key={course.id} className='border p-4 rounded shadow'>
                            <h3 className='text-xl font-semibold'>{course.title}</h3>
                            <p className='text-gray-600'>{course.description}</p>
                            <p className='text-sm text-green-600'>
                                {course.completedCount} students completed
                            </p>
                            <div className='mt-4'>
                                <Link
                                    to={`/edit-course/${course.id}`}
                                    className='text-blue-500 hover:underline mr-4'
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className='text-red-600 hover:underline'
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TeacherDashboard
