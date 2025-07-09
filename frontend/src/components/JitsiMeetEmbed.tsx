// File: src/components/JitsiMeetEmbed.tsx

interface JitsiMeetEmbedProps {
  roomName: string;
}

export default function JitsiMeetEmbed({ roomName }: JitsiMeetEmbedProps) {
  return (
    <iframe
      src={`https://meet.jit.si/${roomName}`}
      allow="camera; microphone; fullscreen; display-capture"
      style={{ width: '100%', height: '600px', border: 0 }}
      title="Live Class via Jitsi"
    />
  );
}
