"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const { lesson } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{lesson} Course</h1>
      <p className="text-lg text-gray-300 mb-6">This is the content for {lesson}.</p>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700"
        onClick={() => router.push("/")}
      >
        Back to Homepage
      </button>
    </div>
  );
}
