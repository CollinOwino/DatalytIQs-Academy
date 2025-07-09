<#
.SYNOPSIS
  Auto‑insert GoogleAuthProvider in files that use Firebase popup/redirect
  but forgot to define `provider`.

.PARAMETER Root
  Project folder to scan (defaults to current directory).

.PARAMETER Apply
  Actually write changes; otherwise just show a preview.

.NOTES
  Author: DatalytIQs Academy helper
#>

param(
  [string] $Root = ".",
  [switch] $Apply
)

Write-Host "🔍 Scanning $Root for missing AuthProviders …" -ForegroundColor Cyan
Set-Location $Root

$authCall     = '(signInWithPopup|signInWithRedirect|linkWithPopup)\s*\('
$providerDecl = 'new\s+\w+AuthProvider\s*\('
$importLine   = '^\s*import .*'

Get-ChildItem -Recurse -Include *.ts,*.tsx | ForEach-Object {

  $file = $_.FullName
  $code = Get-Content $file -Raw

  if ($code -match $authCall -and $code -notmatch $providerDecl) {

    Write-Host "⚠️  $file  →  missing provider" -ForegroundColor Yellow

    # split into lines so we can inject
    $lines      = $code -split "`n"
    $lastImport = ($lines | Select-String -Pattern $importLine | Select-Object -Last 1).LineNumber - 1
    if ($lastImport -lt 0) { $lastImport = -1 }   # file has no imports

    $snippet = @'
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
'@.TrimEnd()

    $patched   = $lines[0..$lastImport] + $snippet + $lines[($lastImport+1)..($lines.Count-1)]
    $patchedTxt = $patched -join "`n"

    if ($Apply) {
      $patchedTxt | Set-Content $file -Encoding UTF8
      Write-Host "   ✓ patched" -ForegroundColor Green
    }
    else {
      Write-Host "   (dry‑run – add -Apply to write)" -ForegroundColor Cyan
    }
  }
}

Write-Host "`n🎉 Finished." -ForegroundColor Green
