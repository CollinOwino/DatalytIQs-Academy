'use client';

import YouTubeEmbed from '@/components/YouTubeEmbed';

export default function ClassesPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        📚 Online Classes
      </h1>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Replace with your actual class video IDs */}
        <YouTubeEmbed videoId="dQw4w9WgXcQ" />
        <YouTubeEmbed videoId="eY52Zsg-KVI" />
        <YouTubeEmbed videoId="5MgBikgcWnY" />
      </section>
    </main>
  );
}

