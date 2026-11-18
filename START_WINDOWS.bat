@echo off
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js 20 or newer from https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing project dependencies...
  call npm install
  if errorlevel 1 (
    echo Installation failed. Check your internet connection and retry.
    pause
    exit /b 1
  )
)
echo.
echo HOSTELVERSE is starting. Open http://localhost:5173 in your browser.
echo.
call npm run dev
pause
