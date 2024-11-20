@echo off
cls

:MENU
cls
echo ================================
echo 1. Guardar Cambios
echo 2. Obtener Cambios
echo 3. Subir a GitHub
echo 4. Configurar Cuenta
echo 5. Salir
echo ================================
set /p opcion="Opcion: "
if "%opcion%"=="1" goto GUARDAR
if "%opcion%"=="2" goto OBTENER
if "%opcion%"=="3" goto SUBIR
if "%opcion%"=="4" goto CONFIG
if "%opcion%"=="5" goto SALIR
goto MENU


:GUARDAR
echo --------------------------------
git add .
set /p commit="Commit: "
echo --------------------------------
git commit -m "%commit%"
echo -------------------------------
git push
echo --------------------------------
pause
goto MENU

:OBTENER
echo --------------------------------
git pull
echo --------------------------------
pause
goto MENU


:SUBIR
echo --------------------------------
git init
git add .
echo --------------------------------
set /p commit="Commit: "
echo --------------------------------
git commit -m "%commit%"
echo --------------------------------
set /p repositorio="Repositorio: "
echo --------------------------------
git remote add origin %repositorio%
echo --------------------------------
set /p rama="Rama: "
echo --------------------------------
git push -u origin %rama%
echo --------------------------------
pause
goto MENU


:CONFIG
echo --------------------------------
set /p name="Username: "
git config --global user.name "%name%"
echo --------------------------------
set /p email="Email: "
git config --global user.email "%email%"
echo --------------------------------
pause
goto MENU


:SALIR
cls
exit