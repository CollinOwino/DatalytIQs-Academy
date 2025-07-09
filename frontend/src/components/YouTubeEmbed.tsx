
// File: src/components/YouTubeEmbed.tsx

interface YouTubeEmbedProps {
  videoId: string;
}

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      width="100%"
      height="400"
      allowFullScreen
      title="YouTube Video"
    />
  );
}
