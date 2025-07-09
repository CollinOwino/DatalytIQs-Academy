'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Countdown from '@/components/Countdown';

export default function LivePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
      } else {
        setUser(firebaseUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
        <h2>Checking authentication...</h2>
      </div>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
        🎥 Live Class Session
      </h1>

      {/* Countdown to session start */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>⏳ Session starts in:</h3>
        <Countdown targetDate="2025-06-22T18:00:00Z" />
      </section>

      {/* Embedded Jitsi session */}
      <section>
        <iframe
          src="https://meet.jit.si/DatalytIQsAcademyClass01"
          width="100%"
          height="600"
          style={{ border: 'none', borderRadius: '10px' }}
          allow="camera; microphone; fullscreen; display-capture"
          title="Live Jitsi Class"
        ></iframe>
      </section>
    </main>
  );
}
