"use client";
import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseName}`);
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setChapters(data.chapters);
      } catch (error) {
        console.error("Error fetching course:", error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = { title, description, chapters };
    try {
      const response = await fetch(`/api/courses/${courseName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error("Failed to update course");
      }
      alert("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-bodyText font-medium mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-divider rounded-md bg-white"
        />
      </div>
      <div>
        <label className="block text-bodyText font-medium mb-1">
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-divider rounded-md bg-white"
        />
      </div>
      <div>
        <label className="block text-bodyText font-medium mb-1">Chapters:</label>
        {chapters.map((chapter, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Chapter Title"
              value={chapter.title}
              onChange={(e) =>
                handleChapterChange(index, "title", e.target.value)
              }
              className="w-full p-2 border border-divider rounded mb-2"
            />
            <textarea
              placeholder="Chapter Content"
              value={chapter.content}
              onChange={(e) =>
                handleChapterChange(index, "content", e.target.value)
              }
              className="w-full p-2 border border-divider rounded"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-buttonPrimary text-white py-3 rounded-md"
      >
        Update Course
      </button>
    </form>
  );
}
