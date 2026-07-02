@echo off
setlocal
title ICAVTI 2026 — Local Preview

set FOLDER=%~dp0
set PORT=8090
set URL=http://localhost:%PORT%/index.html

color 0B
echo.
echo  ====================================================
echo    ICAVTI 2026 Conference Site -- Local Preview
echo    %URL%
echo  ====================================================
echo.

cd /d "%FOLDER%"

python --version >nul 2>&1
if %errorlevel% equ 0 goto :start_server
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    set PYTHON_CMD=python3
    goto :start_server
)

color 0E
echo  [WARN] Python not found. Opening index.html directly instead.
start "" "%FOLDER%index.html"
pause
exit /b

:start_server
netstat -ano | find ":%PORT% " >nul 2>&1
if %errorlevel% equ 0 (
    set PORT=8091
    set URL=http://localhost:%PORT%/index.html
)

echo  [START] Server starting at %URL%
ping 127.0.0.1 -n 2 >nul
start "" "%URL%"
python -m http.server %PORT% 2>nul
if %errorlevel% neq 0 python3 -m http.server %PORT%
