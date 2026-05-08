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
    
    // Limpa relatórios antigos e roda a nova suíte
    // Usamos ';' ou comando separado para não travar se o clean falhar
    const cleanCmd = 'if exist cypress\\reports rd /s /q cypress\\reports';
    const runCmd = 'npx cypress run';
    
    exec(`${cleanCmd} & ${runCmd}`, { maxBuffer: 1024 * 1024 * 20 }, (error, stdout, stderr) => {
        console.log('Execução finalizada.');
        
        // Captura o resumo (as últimas 2500 linhas do log do Cypress)
        const summary = stdout ? stdout.substring(Math.max(0, stdout.length - 2500)) : "Log vazio.";
        
        // Retornamos sempre success: true para que o front-end consiga mostrar o relatório de falhas
        res.json({ 
            success: true, 
            message: 'Processo finalizado',
            summary: summary
        });
    });
});

app.listen(PORT, () => {
    console.log('===================================================');
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`👉 ACESSE NO NAVEGADOR: http://localhost:${PORT}/index.html`);
    console.log('===================================================');
});
