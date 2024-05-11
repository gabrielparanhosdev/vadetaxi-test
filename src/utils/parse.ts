/*
    Aqui transformamos os dados da url em paramtros JSON, usando o baseUrl
    Exemplo: 
        baseUrl => /users/:userId
        url => /users/87979
        resposta => { 
            params: {
                userId: 87979
            }
        }
*/

import { ParamsObject } from "./utils.types";

export const parseUrlParams = (url: string, baseUrl: string) => {
    const regex = /:([^/?]+)/g;
    const paramNames = [];
    let match;

    while ((match = regex.exec(baseUrl)) !== null) {
        paramNames.push(match[1]);
    }

    const dynamicRegex = new RegExp(baseUrl.replace(/\//g, '\\/').replace(regex, '([^/?]+)') + '$');
    const matches = dynamicRegex.exec(url);

    if (matches) {
        const params: ParamsObject = {};

        paramNames.forEach((paramName: string, index: number) => {
            params[paramName] = matches[index + 1];
        });
        
        return params;
    }

    return null;
};
