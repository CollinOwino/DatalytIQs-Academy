# enhance-live-session.ps1

$projectRoot = "C:\Users\PC\project\DatalytIQs-Academy"
$liveDir = Join-Path $projectRoot "app\live"
$libDir = Join-Path $projectRoot "lib"
$hookPath = Join-Path $libDir "useLiveSession.ts"
$layoutPath = Join-Path $liveDir "layout.tsx"
$pagePath = Join-Path $liveDir "page.tsx"

# 1. Create 'lib/useLiveSession.ts' with fetch logging
$hookContent = @"
'use client'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface SessionInfo {
  topic: string
  link: string
  scheduledAt: string
}

export default function useLiveSession(uid: string | null) {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)

  useEffect(() => {
    const fetchSession = async (uid: string) => {
      console.log("Fetching session for UID:", uid)
      try {
        const docRef = doc(db, 'sessions', uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setSessionInfo(docSnap.data() as SessionInfo)
        } else {
          console.warn("No session data found for UID:", uid)
        }
      } catch (error) {
        console.error("Failed to fetch session:", error)
      }
    }

    if (uid) fetchSession(uid)
  }, [uid])

  return sessionInfo
}
"@
New-Item -Path $hookPath -Force -ItemType File | Out-Null
Set-Content -Path $hookPath -Value $hookContent
Write-Host "✅ Hook created: useLiveSession.ts"

# 2. Create 'layout.tsx' for the Live page
$layoutContent = @"
import '@/app/globals.css'

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">🔴 DatalytIQs Live Classroom</h1>
      <div className="w-full max-w-3xl px-4">{children}</div>
      <footer className="mt-10 text-sm text-gray-500">
        © 2025 DatalytIQs Academy. All rights reserved.
      </footer>
    </div>
  )
}
"@
New-Item -Path $layoutPath -Force -ItemType File | Out-Null
Set-Content -Path $layoutPath -Value $layoutContent
Write-Host "✅ Layout created: layout.tsx"

# 3. Create 'page.tsx' for the Live session viewer
$pageContent = @"
'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@/lib/useUserSession'
import useLiveSession from '@/lib/useLiveSession'

export default function LivePage() {
  const { user } = useUser()
  const session = useLiveSession(user?.uid || null)

  return (
    <div className="text-center">
      {session ? (
        <>
          <h2 className="text-xl font-semibold">Topic: {session.topic}</h2>
          <p className="text-gray-600 mb-2">Scheduled at: {session.scheduledAt}</p>
          <a href={session.link} target="_blank" className="text-blue-600 underline">
            Join Now
          </a>
        </>
      ) : (
        <p className="text-red-600">⚠️ Failed to fetch session info.</p>
      )}
    </div>
  )
}
"@
New-Item -Path $pagePath -Force -ItemType File | Out-Null
Set-Content -Path $pagePath -Value $pageContent
Write-Host "✅ Live page created: page.tsx"
