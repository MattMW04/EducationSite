"use client";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Link from 'next/link';
import CourseListPopover from '@/components/CourseLists/CourseListPopover'

interface Course {
  title: string;
  description: string;
  chapters: { title: string; content: string }[];
  private: boolean;
}

export default function UserCourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses/user');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = (courseName: string) => {
    setCourseName(courseName);
    setIsOpen(true);
  };

  const handleDelete = async (courseName: string) => {
    try {
      const response = await fetch(`/api/courses/${courseName}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      const data = await response.json();

      if (data.message === "Course deleted successfully") {
        toast.success("Course deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          style: {
            padding: "16px",
          },
        });
        setCourses(courses.filter((course) => course.title !== courseName));
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          style: {
            padding: "16px",
          },
        });
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    } finally {
      handleClose();
    }
  };

  return (
    <div className="min-h-screen mb-4">
      <header className="bg-cardBackground p-6 rounded-xl shadow w-full max-w-4xl mx-auto my-4 text-center">
        <h1 className="text-2xl font-bold text-headerText mb-2">Your Courses</h1>
        <p className="text-bodyText text-base">
          Manage and explore the courses you have created.
        </p>
      </header>
      {isOpen && (
        <CourseListPopover
          courseTitle={courseName}
          onClose={handleClose}
          handleDelete={handleDelete}
        />
      )}
      {courses.length === 0 ? (
        <div className="text-center p-4 flex flex-col items-center justify-start min-h-[200px] min-w-[400px] md:min-h-[400px] md:min-w-[600px] mt-4">
          <h1 className="text-2xl font-bold mb-4 text-headerText break-words">No courses found</h1>
          <p className="text-bodyText break-words">
            Please create a course to view it here.
          </p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 min-h-[200px] min-w-[200px] ${
            courses.length <= 2 ? "place-items-center" : ""
          }`}
        >
          {courses.map((course, i) => (
            <div
              key={i}
              className="p-4 mb-2 bg-cardBackground shadow-lg rounded min-h-[200px] min-w-[400px] ml-4 mr-4"
            >
              <h2 className="text-xl font-bold mb-2 text-headerText">{course.title}</h2>
              <p className="mb-2 text-bodyText">{course.description}</p>
              <p className="mb-2 text-bodyText">Chapters: {course.chapters.length}</p>
              {course.private ? (
                <p className="mb-2 font-bold text-bodyText">Privacy: Private</p>
              ) : (
                <p className="mb-2 text-bodyText">Privacy: Public</p>
              )}
              <Link
                href={`/editCourse/${course.title}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-buttonHover transition-all mr-2"
              >
                Edit Course
              </Link>
              <Link
                href={`/course/${course.title}`}
                className="inline-block px-4 py-2 bg-green-500 text-white rounded  hover:bg-buttonSecondaryHover transition-all mr-2"
              >
                View Course
              </Link>
                <button
                className="inline-block px-4 py-2 bg-error text-white rounded hover:bg-red-700 transition-all mt-4 "
                onClick={() => handleOpen(course.title)}
                >
                Delete Course
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
