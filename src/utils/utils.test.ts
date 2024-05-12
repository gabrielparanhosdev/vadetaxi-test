import { MockProxy, mock } from "jest-mock-extended";
import { USERSBYID } from "../routes";
import { insertInTo, selectTable, updateTable } from "./fake-db";
import { makeHttpRequest } from "./make-http-request";
import { parseUrlParams } from "./parse";
import { IncomingMessage } from "http";
import * as UtilsModule from '.';


describe('PARSE TEST', () => {
    it('should success parse url', () => {
        const result = parseUrlParams("/users/asd98", USERSBYID);
        expect(result).toHaveProperty("id")
    });

    it('should error parse url', () => {
        const result = parseUrlParams("/users/asd98/teste", USERSBYID);
        expect(result).toBe(null)
    });
});

describe('FAKE DB TEST', () => {
    it('should success insertInTo', () => {
        const tableName = 'users';
        const data = [
            { id: 1, name: 'Paranhos Ga', email: 'gabriel@vadetaxi.com.br' }
        ];

        const result = insertInTo(tableName, data);

        expect(result).toBe(true);
    });
    it('should success selectTable', () => {
        const tableName = 'users';


        const result = selectTable(tableName);

        expect(result[0]).toHaveProperty("id");
    });

    it('should success update', () => {
        const tableName = 'users';
        const data = {
            payload: {
                name: 'Paranhos Ga',
                email: 'gabriel@vadetaxi.com.br'
            },
            params: {
                id: 1,
            }
        }

        const result = updateTable(tableName, data.payload, data.params, "id");

        expect(result).toHaveProperty("name", 'Paranhos Ga');
    });

    it('should error return null', () => {
        const tableName = 'users';
        const data = {
            payload: {},
            params: {}
        }

        const result = updateTable(tableName, data.payload, data.params, "id");

        expect(result).toBe(null);
    });


})