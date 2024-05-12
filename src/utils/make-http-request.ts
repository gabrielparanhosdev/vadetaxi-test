/*
Está função pega o body e os parametros para enviar como props da funcionalidade solicitada do verbo em questão
*/

import { IncomingMessage } from "http";
import { parseUrlParams } from "./parse";
import { urlBases } from "../routes";

export function makeHttpRequest(req: IncomingMessage): Promise<string | { payload: object, params: object }> {
    return new Promise((resolve, reject) => {
        const { url } = req;
        
        if (url) {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                let payload = {};
                
                if (body) {
                    try {
                        payload = JSON.parse(body);
                    } catch (error) {
                        reject(error);
                        return;
                    }
                }
                
                const baseUrl = getBaseUrl(url);
                
                if (baseUrl) {
                    const params = parseUrlParams(url, baseUrl);

                    if (params) {
                        resolve({
                            payload,
                            params
                        });
                    } else {
                        reject(new Error('Falha ao extrair parâmetros da URL'));
                    }
                } else {
                    reject(new Error('URL base não encontrada'));
                }
            });

            req.on('error', error => {
                reject(error);
            });
        } else {
            reject(new Error('erro na rota'));
        }
    });
}

// Realizamos a busca em qual baseUrl usaremos para transformar os dados da url em paramtros acesiveis em JSON
export const getBaseUrl = (url: string) => {
    const matchedBaseUrl = urlBases.find((baseUrl: string) => {
        const regex = new RegExp(`^${baseUrl.replace(/:[^/?]+/g, '([^/?]+)')}$`);
        return regex.test(url);
    });
    return matchedBaseUrl || null;
};

