import React from "react";
import CourseDetails from "@/app/components/Courses/CourseDetails";
import { cookies } from "next/headers";

export const metadata = {
  title: "AccessEDUK: Course Details",
  description: "View course details",
};

async function fetchCourseData(courseName: string) {
    const cookieStore = await cookies();

    // first try and access the secure cookie - for deployment on Vercel
    let sessionToken = cookieStore.get('__Secure-next-auth.session-token')?.value;
    // set the cookie name to the secure cookie name
    let cookieName = '__Secure-next-auth.session-token';

    // if the secure cookie is not found, try the regular cookie - for local development
    if (!sessionToken){
        sessionToken = cookieStore.get('next-auth.session-token')?.value;
        // set the cookie name to the regular cookie name
        cookieName = 'next-auth.session-token';
    }

    if (!sessionToken) {
        throw new Error('Unauthorized: No session token found');
    }
  const baseurl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseurl}/courses/${courseName}`;
  const headers = {
    'Authorization': `Bearer ${sessionToken}`,
    Cookie: `${cookieName}=${sessionToken}` 
};
  try {
    const response = await fetch(url,{
        headers,
        credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch course data: " + response.statusText);
    }

    const courseData = await response.json();
    return courseData?.data?.[0] || null; // Access the first element of the  array
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error;
  }
}

export default async function CoursePage({ params }) {
  const { name } = await params;

  try {
    const course = await fetchCourseData(name);

    if (!course) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold text-center text-headerText">
            Course not found
          </h1>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center">
        <CourseDetails course={course} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching course:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-bodyText">
        {error.message}
      </div>
    );
  }
}
