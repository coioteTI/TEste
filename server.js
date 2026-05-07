const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Serve os arquivos estáticos do projeto atual
app.use(express.static(path.join(__dirname)));

// Endpoint que será chamado pelo botão para rodar os testes
app.post('/api/run-test', (req, res) => {
    console.log('Iniciando execução do Cypress...');
    
    // Roda a suíte completa de testes (ColmeIA + Sistema Local) para um relatório completo
    exec('npx cypress run', (error, stdout, stderr) => {
        console.log('Cypress finalizado!');
        res.json({ 
            success: true, 
            message: 'Execução concluída com sucesso',
            output: stdout 
        });
    });
});

app.listen(PORT, () => {
    console.log('===================================================');
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`👉 ACESSE NO NAVEGADOR: http://localhost:${PORT}/index.html`);
    console.log('===================================================');
});
