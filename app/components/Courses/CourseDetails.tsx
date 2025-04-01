"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CourseDetailsProps {
  courseName: string;
}

interface Chapter {
  title: string;
  content: string;
}

interface Course {
  title: string;
  description: string;
  chapters: Chapter[];
  quizzes: string[]; 
}

export default function CourseDetails({ courseName }: CourseDetailsProps) {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseName}`);
        const result = await response.json();
        const courseData = result.data?.[0]; // Access the first element of the 'data' array
        setCourse(courseData || null);
        console.log("Course data:", courseData);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourse();
  }, [courseName]);

  if (!course) {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold text-headerText">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <header className="bg-cardBackground p-6 rounded-xl shadow w-full max-w-4xl mx-auto my-4 text-center">
        <h1 className="text-3xl font-bold text-headerText">{course.title}</h1>
        <p className="text-bodyText">{course.description}</p>
      </header>
      <div className="max-w-4xl mx-auto">
        {(course.chapters || []).map((chapter, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-cardBackground shadow-lg rounded"
          >
            <h2 className="text-xl font-bold text-headerText">
              {chapter.title}
            </h2>
            <p className="text-bodyText">{chapter.content}</p>
          </div>
        ))}
      </div>
      <div className="p-2 mb-4 bg-cardBackground shadow-lg rounded text-center justify-center"> 
        <h2 className="text-xl font-bold text-headerText p-2 mb-2">Quizzes</h2>
        <p className="text-bodyText">These Quizzes are Linked by the Creator as related quizzes to this subject, please navigate through the buttons to access each quiz.</p>
        {(course.quizzes || []).map((quiz, index) =>(
          <div key={index} className="p-2 mb-4 bg-cardBackground shadow-lg rounded ">
            <h2 className="text-xl font-bold text-headerText p-2 mb-2">{quiz}</h2>
            <Link href={`/quiz/${quiz}`} className="bg-buttonSecondary text-white px-4 py-2 rounded">
              Go To {quiz}
            </Link>
          </div>
        ) )}
      </div>
    </div>
  );
}
