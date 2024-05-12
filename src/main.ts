import * as http from 'http'; // Importa o módulo http completo
import { IncomingMessage, ServerResponse } from 'http'; // Importa os tipos IncomingMessage e ServerResponse

import { handleRequest } from './controller';
import { ResponseService } from './types';

export function createServer(){
    return http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'application/json');
        try {
            const { statusCode, data, error }: ResponseService = await handleRequest(req);
    
            if (error) {
                res.statusCode = statusCode || 500;
                res.end(JSON.stringify({ error }));
            } else {
                res.statusCode = statusCode || 200;
                res.end(JSON.stringify({ data }));
            }
        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error || 'Erro interno do servidor' }));
        }
    });
}

const server = createServer();

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
