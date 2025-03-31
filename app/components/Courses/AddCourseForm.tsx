"use client";
import React, { useState } from "react";

interface Chapter {
  title: string;
  content: string;
}

export default function AddCourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([
    { title: "", content: "" },
  ]);

  const addChapter = () => {
    setChapters([...chapters, { title: "", content: "" }]);
  };

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
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error("Failed to create course");
      }
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
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
        <button
          type="button"
          onClick={addChapter}
          className="py-2 px-4 bg-buttonSecondary text-white rounded"
        >
          Add Chapter
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-buttonPrimary text-white py-3 rounded-md"
      >
        Create Course
      </button>
    </form>
  );
}
