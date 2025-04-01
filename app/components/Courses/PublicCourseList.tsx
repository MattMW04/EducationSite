"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  title: string;
  description: string;
}

export default function PublicCourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/public");
        const data = await response.json();

        if (Array.isArray(data)) {
          setCourses(data);
          console.log("Fetched courses:", data);
        } else {
          // no courses found 
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // Handle fetch errors by setting courses to an empty array
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen mb-4">
      <header className="bg-cardBackground p-6 rounded-xl shadow w-full max-w-4xl mx-auto my-4 text-center">
        <h1 className="text-2xl font-bold text-headerText mb-2">Public Courses</h1>
        <p className="text-bodyText text-base">
          Browse through the courses available for everyone to enhance their learning.
        </p>
      </header>
      {courses.length === 0 ? (
        <div className="text-center p-4 flex flex-col items-center justify-start min-h-[200px] min-w-[400px] md:min-h-[400px] md:min-w-[600px] mt-4">
          <h1 className="text-2xl font-bold mb-4 text-headerText break-words">No courses found</h1>
          <p className="text-bodyText break-words">
            Please check back later or create a new course.
          </p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 min-h-[200px] min-w-[200px] ${
            courses.length <= 2 ? "place-items-center" : ""
          }`}
        >
          {courses?.map((course, i) => (
            <div
              key={i}
              className="p-4 mb-2 bg-cardBackground shadow-lg rounded min-h-[200px] min-w-[400px] ml-4"
            >
              <h2 className="text-xl font-bold mb-2 text-headerText">{course.title}</h2>
              <p className="mb-2 text-bodyText">{course.description}</p>
              <Link
                href={`/course/${course.title}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-buttonHover transition-all"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
