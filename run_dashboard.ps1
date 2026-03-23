# 주식 대시보드 통합 실행 스크립트 (PowerShell)
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "============================" -ForegroundColor Cyan
Write-Host "  주식 대시보드 시스템 기동" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

$projectDir = "C:\Users\shs95\Desktop\개인 맞춤형 대쉬보드"
Set-Location $projectDir

# 1. 기존 프로세스 정리
Write-Host "[1/3] 기존 서버 정리 중..." -ForegroundColor Yellow
Stop-Process -Name "node" -ErrorAction SilentlyContinue
Stop-Process -Name "python" -ErrorAction SilentlyContinue

# 2. 백엔드 실행
Write-Host "[2/3] 백엔드(Python) 서버 시작..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k chcp 65001 & title Stock-Backend & python -m uvicorn server:app --port 8000" -WindowStyle Normal

# 3. 프론트엔드 실행
Write-Host "[3/3] 프론트엔드(React) 서버 시작..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k chcp 65001 & title Stock-Frontend & npm run dev" -WindowStyle Normal

Write-Host "`n연결 대기 중 (10초)..." -ForegroundColor Magenta
Start-Sleep -Seconds 10

Write-Host "브라우저를 엽니다!" -ForegroundColor Cyan
Start-Process "http://127.0.0.1:5173"

Write-Host "`n작업 완료! 창을 닫으셔도 됩니다."
Pause
