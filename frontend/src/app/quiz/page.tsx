// File: src/app/quiz/page.tsx

import Quiz from '@/components/Quiz';

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Take the Quiz</h1>
      <Quiz />
    </main>
  );
}
