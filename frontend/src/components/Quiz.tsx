// File: src/components/Quiz.tsx

'use client';

import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

const Quiz = () => {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const responseId = uuidv4(); // Unique ID for the response
    try {
      await setDoc(doc(db, 'quizResponses', responseId), {
        answer,
        submittedAt: new Date(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving response:', error);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto mt-6 bg-white">
      <h2 className="text-xl font-semibold mb-2">Quiz: What is 5 + 3?</h2>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={submitted}
      >
        {submitted ? 'Submitted' : 'Submit'}
      </button>
      {submitted && <p className="mt-2 text-green-600">Answer submitted!</p>}
    </div>
  );
};

export default Quiz;
