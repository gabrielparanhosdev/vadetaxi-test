const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 0 });

export function selectTable(tableName: string, defaultResponse = null): any {
    // aqui poderiamos fazer o select no banco de dados MySQL, MongoDB entre outros
    return cache.get(tableName) || defaultResponse
}

export function insertInTo(tableName: string, data: any): boolean {
    // aqui podemos fazer o insert em um banco de daods também por exemplo.
    cache.set(tableName, data);
    return true;
}

export function updateTable(tableName: string, data: any, req: any, where: string): any {
    // aqui poderiamos realizar um update mais simplificado usando uma lib de banco de dados

    const table = selectTable(tableName, null);

    if (table) {
        const index = table.findIndex((line: any) => line[where] == req[where]);
        if (index !== -1) {

            // verificamos se o usuario que está solicitando a mudança é o mesmo que cadastrou
            // assim motoristas podem realizar ações sem comprometer os dados
            if (table[index]["id"] !== req.id) {
                delete data.id
            }

            table[index] = { ...table[index], ...data };
            cache.set(tableName, table);
            return table[index]
        }

        return null
    }

    return null
}