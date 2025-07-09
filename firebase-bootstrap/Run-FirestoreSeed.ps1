# Run-FirestoreSeed.ps1  –  wrapper that validates Node/Firebase setup
# (identical content to the final script I sent earlier)
[CmdletBinding()]
param()
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
function Get-ProjectRoot {
    $d = [IO.DirectoryInfo] (Get-Location).Path
    while ($d) {
        if (Test-Path (Join-Path $d.FullName 'package.json')) { return $d }
        $d = $d.Parent
    }
    throw "package.json not found in current or parent directories."
}
function Require-Command ($cmd, $hint) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        throw "`"$cmd`" not found. $hint"
    }
}
try {
    $root = Get-ProjectRoot
    Push-Location $root
    Require-Command node "Install Node from https://nodejs.org/"
    $nodeVer = (& node --version).TrimStart('v') -as [version]
    if ($nodeVer.Major -lt 14) { throw "Node $nodeVer is too old (need ≥ 14)." }
    if (-not (Test-Path 'node_modules\firebase-admin')) {
        Write-Host "⬇️  Installing firebase-admin..."
        npm install firebase-admin --no-fund
    }
    if (-not $env:GOOGLE_APPLICATION_CREDENTIALS -and -not (Test-Path 'serviceAccountKey.json')) {
        throw "No Firestore credentials. Set \$env:GOOGLE_APPLICATION_CREDENTIALS or place serviceAccountKey.json at project root."
    }
    $seedFile = Join-Path $root 'seedFirestore.js'
    if (-not (Test-Path $seedFile)) {
@"
/**
 * seedFirestore.js – minimal demo
 */
const admin = require('firebase-admin');
const path  = require('path');
(async () => {
  try {
    if (admin.apps.length === 0) {
      const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS ||
                       path.join(__dirname, 'serviceAccountKey.json');
      admin.initializeApp({ credential: admin.credential.cert(require(credPath)) });
    }
    const db = admin.firestore();
    await db.collection('students').doc('demo').set({
      name: 'Demo Student',
      role: 'student',
      created: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('✅  Firestore seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌  Seeding failed:', err);
    process.exit(1);
  }
})();
"@ | Set-Content -Encoding UTF8 $seedFile
        Write-Host "✍️  Created minimal seedFirestore.js – edit it as you like."
    }
    Write-Host "🚀  Running Firestore seed script with Node..."
    node seedFirestore.js
}
catch { Write-Error -Message $_.Exception.Message }
finally { if ($root) { Pop-Location } }
