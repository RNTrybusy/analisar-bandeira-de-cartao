const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`Solicitação recebida: ${req.method} ${req.url}`);
    
    // Extrai o caminho do URL, removendo parâmetros de consulta
    let filePath = '.' + req.url.split('?')[0];
    if (filePath === './') {
        filePath = './teste.html';
    }
    
    // Obtém a extensão do arquivo
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // Define o tipo de conteúdo com base na extensão do arquivo
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Lê o arquivo
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Arquivo não encontrado
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Erro do servidor
                res.writeHead(500);
                res.end(`Desculpe, ocorreu um erro: ${error.code}`);
            }
        } else {
            // Sucesso
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
