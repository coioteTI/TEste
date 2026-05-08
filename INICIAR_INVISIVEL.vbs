Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c node server.js", 0, False
WshShell.Run "http://localhost:3000/index.html"
