'use client';

import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const provider = new GoogleAuthProvider();

export default function Login() {
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p>Sign in to access your dashboard</p>
        <button
          onClick={loginWithGoogle}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
