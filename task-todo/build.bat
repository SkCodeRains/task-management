@echo off

REM Remove the "docs" folder
rmdir /s /q "docs"

REM Define source and destination directories
set "source_dir=dist\task-management\browser"
set "destination_dir=../docs"

REM Create destination directory if it doesn't exist
if not exist "%destination_dir%" mkdir "%destination_dir%"

REM Copy files and directories from source to destination recursively
xcopy /s /e /y "%source_dir%\*" "%destination_dir%"

REM Remove the "dist" folder
rmdir /s /q "dist"
