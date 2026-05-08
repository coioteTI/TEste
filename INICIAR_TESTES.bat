@echo off
echo ===================================================
echo Iniciando o Servidor de Testes QA Cypress...
echo Por favor, não feche esta janela enquanto estiver testando.
echo ===================================================
echo Abrindo o navegador...
start http://localhost:3000/index.html
node server.js
pause
