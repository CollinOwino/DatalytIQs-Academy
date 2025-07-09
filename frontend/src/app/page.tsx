'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function HomePage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, provider); // fallback
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <main style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1>Welcome to DatalytIQs Academy</h1>
      <button onClick={handleLogin} disabled={busy}>
        {busy ? 'Opening Google…' : 'Sign in with Google'}
      </button>
    </main>
  );
}
