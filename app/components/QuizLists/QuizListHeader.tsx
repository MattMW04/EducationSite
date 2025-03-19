"use client";
import React from "react";

interface QuizListHeaderProps {
  title: string;
  text: string;
}

export default function QuizListHeader({ title, text }: QuizListHeaderProps) {
  return (
    <header className="bg-cardBackground p-6 rounded-xl shadow w-full max-w-4xl mx-auto my-4 text-center">
      <h1 className="text-2xl font-bold text-headerText mb-2">{title}</h1>
      <p className="text-bodyText text-base">{text}</p>
    </header>
  );
}
