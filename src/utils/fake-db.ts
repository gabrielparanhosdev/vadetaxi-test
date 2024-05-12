const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 0 });

export function selectTable(tableName: string): any {
    // aqui poderiamos fazer o select no banco de dados MySQL, MongoDB entre outros
    return cache.get(tableName);
}

export function insertInTo(tableName: string, data: any): boolean {
    // aqui podemos fazer o insert em um banco de daods também por exemplo.
    cache.set(tableName, data);
    return true;
}

export function updateTable(tableName: string, data: any, req: any, where: string): any {
    // aqui poderiamos realizar um update mais simplificado usando uma lib de banco de dados

    const table = selectTable(tableName);

    if (table) {
        const index = table.findIndex((line: any) => line[where] == req[where]);
        if (index !== -1) {

            delete data.id

            table[index] = { ...table[index], ...data };
            cache.set(tableName, table);
            return table[index]
        }

        return null
    }

    return null
}

export function clearCache(){
    cache.flushAll();
}