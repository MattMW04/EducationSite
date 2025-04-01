"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  title: string;
  description: string;
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/user");
        const data = await response.json();
        setCourses(data);
        console.log("Fetched courses:", data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen mb-4">
      <header className="bg-cardBackground p-6 rounded-xl shadow w-full max-w-4xl mx-auto my-4 text-center">
        <h1 className="text-2xl font-bold text-headerText mb-2">Courses</h1>
        <p className="text-bodyText text-base">
          Browse through the available courses to enhance your learning.
        </p>
      </header>
      {courses.length === 0 ? (
        <div className="text-center p-4 flex flex-col items-center justify-start min-h-[200px]">
          <h1 className="text-2xl font-bold mb-4 text-headerText">
            No courses found
          </h1>
          <p className="text-bodyText">
            Please check back later or create a new course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {courses.map((course, i) => (
            <div
              key={i}
              className="p-4 bg-cardBackground shadow-lg rounded min-h-[200px]"
            >
              <h2 className="text-xl font-bold mb-2 text-headerText">
                {course.title}
              </h2>
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
