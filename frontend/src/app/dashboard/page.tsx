'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        router.push('/login');
      }
    });
    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <main className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Logged in as <strong>Collins Owino</strong>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <section>
        <h2 className="text-lg font-semibold">📚 My Courses</h2>
        <p className="text-gray-500 italic">Coming soon – list of enrolled courses.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">📊 Recent Quiz Scores</h2>
        <p className="text-gray-500 italic">Coming soon – latest quiz results.</p>
      </section>
    </main>
  );
}
