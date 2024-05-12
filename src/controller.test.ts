import { IncomingMessage } from "http";
import { handleRequest } from "./controller";
import { MockProxy, mock } from 'jest-mock-extended';
import * as UtilsModule from './utils';

describe('CONTROLLER REQUEST', () => {
    let mockReq: MockProxy<IncomingMessage>;

    beforeEach(() => {
        mockReq = mock<IncomingMessage>();
    })

    it('should request POST success route with authIsMandatory false', async () => {
        mockReq.url = '/users';
        mockReq.method = 'POST';

        jest.spyOn(UtilsModule, 'makeHttpRequest')
        .mockReturnValue(new Promise((resolve, reject)=>{
            resolve({
                params: {},
                payload: {
                    name: "Gabriel",
                    email: "gabriel@vadetaxi.com.br",
                    password: "123"
                }
            })
        }));
        

        const result = await handleRequest(mockReq);
        expect(result.statusCode).toBe(200);
    });

    it('should request GET success route with authIsMandatory true', async () => {
        mockReq.url = '/users';
        mockReq.method = 'GET';
        mockReq.headers.authorization = 'da98s7ds';

        jest.spyOn(UtilsModule, 'selectTable')
        .mockReturnValueOnce({
            authToken: "da98s7ds"
        });
        jest.spyOn(UtilsModule, 'selectTable')
        .mockReturnValueOnce([
            {
                id: "soid3hs5",
                name:"gabriel",
                email: "gabriel@vadetaxi.com.br"
            }
        ]);

        jest.spyOn(UtilsModule, 'makeHttpRequest')
        .mockReturnValue(new Promise((resolve, reject)=>{
            resolve({
                params: {},
                payload: {}
            })
        }));
        

        const result = await handleRequest(mockReq);
        expect(result.statusCode).toBe(200);
    })

    it('should request POST error return message dont exist route or method', async () => {
        const result = await handleRequest(mockReq);
        expect(result.statusCode).toBe(400);
        expect(result.data).toBe("dont exist route or method");
    });

    it('should request POST error return message not found', async () => {
        mockReq.url = '/users2';
        mockReq.method = 'POST';

        const result = await handleRequest(mockReq);
        expect(result.statusCode).toBe(404);
        expect(result.data).toBe("not found");
    });

    it('should request POST error return message Not authorized', async () => {
        mockReq.url = '/rides';
        mockReq.method = 'POST';

        const result = await handleRequest(mockReq);
        expect(result.statusCode).toBe(500);
        expect(result.error).toBe("Not authorized");
    });

    it('should request POST error return message Internal server error', async () => {
        mockReq.url = '/users';
        mockReq.method = 'GET';
        mockReq.headers.authorization = 'da98s7ds';

        jest.spyOn(UtilsModule, 'selectTable')
        .mockReturnValueOnce({
            authToken: "da98s7ds"
        });
        jest.spyOn(UtilsModule, 'selectTable')
        .mockReturnValueOnce([
            {
                id: "soid3hs5",
                name:"gabriel",
                email: "gabriel@vadetaxi.com.br"
            }
        ]);

        jest.spyOn(UtilsModule, 'makeHttpRequest')
        .mockReturnValue(new Promise((resolve, reject)=>{
            reject(null)
        }));

        const result = await handleRequest(mockReq);
        expect(result.statusCode).toBe(500);
        expect(result.error).toBe("Internal server error");
    });

    
})