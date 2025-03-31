"use client";
import React, { useState, useRef } from "react";
import FormWrapper from "../AccountForms/FormWrapper";
import { useSession } from "next-auth/react";
import QuizFormErrorMessage from "../Quizzes/QuizFormErrorMessage";
import QuizFormSuccessMessage from "../Quizzes/QuizFormSuccessMessage";
import QuizDropdown from "./QuizDropdown";

interface Chapter {
  title: string;
  content: string;
}

export default function AddCourseForm() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([{ title: "", content: "" }]);
  const [privateCourse, setPrivateCourse] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);

  React.useEffect(() => {
    if (success) {
      successRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [success]);

  const addChapter = () => {
    setChapters([...chapters, { title: "", content: "" }]);
  };

  const handleChapterChange = (index: number, field: "title" | "content", value: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
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

    const courseData = {
      title,
      description,
      chapters,
      createdBy: session?.user?.id,
      private: privateCourse,
      quizzes: selectedQuizzes,
    };

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      console.log("Course creation response:", await response.json());

      if (!response.ok) {
        setError("Failed to create course. Please try again.");
        setSuccess("");
        return;
      }
      setSuccess("Course created successfully!");
      setError("");
      setTitle("");
      setDescription("");
      setChapters([{ title: "", content: "" }]);
      setPrivateCourse(false);
      setSelectedQuizzes([]);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-start justify-center pt-24 p-4 w-full">
      <main className="flex justify-center items-start w-full">
        <FormWrapper title="Create Course">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <QuizFormErrorMessage error={error} errorRef={errorRef} />}
            {success && <QuizFormSuccessMessage success={success} successRef={successRef} />}
            <div>
              <label className="block text-bodyText font-medium mb-1">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
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

            <QuizDropdown selectedQuizzes={selectedQuizzes} setSelectedQuizzes={setSelectedQuizzes} />

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
              Create Course
            </button>
          </form>
        </FormWrapper>
      </main>
    </div>
  );
}
