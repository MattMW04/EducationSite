"use client";
import React, { useState, useEffect, useRef } from "react";
import FormWrapper from "../AccountForms/FormWrapper";
import QuizFormErrorMessage from "../Quizzes/QuizFormErrorMessage";
import QuizFormSuccessMessage from "../Quizzes/QuizFormSuccessMessage";
import QuizDropdown from "./QuizDropdown";

interface Chapter {
  title: string;
  content: string;
}

interface EditCourseFormProps {
  courseName: string;
}

export default function EditCourseForm({ courseName }: EditCourseFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [privateCourse, setPrivateCourse] = useState(false);
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      successRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [success]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseName}`);
        const data = await response.json();
        const course = data.data[0];
        setTitle(course.title);
        setDescription(course.description);
        setChapters(course.chapters);
        setPrivateCourse(course.private || false);
        setSelectedQuizzes(course.quizzes || []);
      } catch (error) {
        console.error("Error fetching course:", error);
        setSelectedQuizzes([]); 
      }
    };
    fetchCourse();
  }, [courseName]);

  const handleChapterChange = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const addChapter = () => {
    setChapters([...chapters, { title: "", content: "" }]);
  };

  const deleteChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please fill out all required fields.");
      setSuccess("");
      return;
    }
    for (const chapter of chapters) {
      if (!chapter.title.trim() || !chapter.content.trim()) {
        setError("Each chapter must have a title and content.");
        setSuccess("");
        return;
      }
    }
    setError("");
    setSuccess("");

    const courseData = { title, description, chapters, private: privateCourse, quizzes: selectedQuizzes };
    try {
      const response = await fetch(`/api/courses/${courseName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        setError("Failed to update course. Please try again.");
        setSuccess("");
        return;
      }
      setSuccess("Course updated successfully!");
      setError("");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-start justify-center pt-24 p-4 w-full">
      <main className="flex justify-center items-start w-full">
        <FormWrapper title="Edit Course">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <QuizFormErrorMessage error={error} errorRef={errorRef} />}
            {success && <QuizFormSuccessMessage success={success} successRef={successRef} />}
            <div>
              <label className="block text-bodyText font-medium mb-1">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-divider rounded-md bg-gray-200 focus:ring-2 focus:ring-primary focus:outline-none text-black"
                disabled 
                aria-disabled="true"
              />
            </div>

            <div>
              <label className="block text-bodyText font-medium mb-1">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
              />
            </div>

            <div className="flex items-center mt-4">
              <label className="text-bodyText ml-2 mr-2">Private ?</label>
              <input
                type="checkbox"
                checked={privateCourse}
                onChange={(e) => setPrivateCourse(e.target.checked)}
                className="appearance-none w-4 h-4 mr-4 border-2 border-gray-300 relative checked:bg-buttonSecondary checked:border-buttonSecondary transition-all bg-cardBackground"
              />
            </div>

            <QuizDropdown
              selectedQuizzes={selectedQuizzes}
              setSelectedQuizzes={setSelectedQuizzes}
              noQuizzesMessage="No user quizzes found."
            />

            <div className="mt-6">
              <label className="block mb-2 font-bold text-lg text-bodyText">Chapters:</label>
              {chapters.map((chapter, index) => (
                <div key={index} className="mb-4 p-4 border border-divider rounded bg-cardBackground">
                  <label className="block text-bodyText font-medium mb-1">Chapter Title:</label>
                  <input
                    type="text"
                    placeholder="Chapter Title"
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(index, "title", e.target.value)}
                    className="w-full p-2 border border-divider rounded mb-2 bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                  />
                  <label className="block text-bodyText font-medium mb-1">Chapter Content:</label>
                  <textarea
                    placeholder="Chapter Content"
                    value={chapter.content}
                    onChange={(e) => handleChapterChange(index, "content", e.target.value)}
                    className="w-full p-2 border border-divider rounded bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                  />
                  <button
                    type="button"
                    onClick={() => deleteChapter(index)}
                    className="py-1 px-3 mt-2 bg-red-500 text-white rounded"
                  >
                    Delete Chapter
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addChapter}
                className="py-2 px-4 mt-2 bg-buttonSecondary text-buttonText rounded"
              >
                Add Another Chapter
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-buttonPrimary text-buttonText py-3 rounded-md font-bold hover:bg-buttonHover mt-4 cursor-pointer"
            >
              Update Course
            </button>
          </form>
        </FormWrapper>
      </main>
    </div>
  );
}
