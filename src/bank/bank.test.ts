import { logout } from '../logout/logout.services';
import * as UtilsModule from '../utils';
import { createBank } from "./bank.services"

describe('CREATE BANK ACCOUNT', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should success create bank account', () => {
        const props = {
            payload: {
                bankName: "Vá de Taxi Bank",
                bankAccountNumber: "32346254-1",
                bankAccountAgency: '0001',
            }
        };

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValueOnce({
                user: {
                    id: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    name: 'Paranhos Ga',
                    email: 'john@example.com',
                    password: "123"
                }
            })
            .mockReturnValueOnce([
                {
                    bankName: "Vá de Taxi Bank",
                    bankAccountNumber: "32346254-1",
                    bankAccountAgency: '0001',
                    id: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e34765",
                }
            ])



        const result = createBank(props);
        expect(result.statusCode).toBe(200)
        expect(result.data).toHaveProperty("bankId")
    })
    it('should error return payload is invalid', () => {
        const props = {
            payload: {
                bankName: "Vá de Taxi Bank",
                bankAccountNumber: "32346254-1",
            }
        };

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValueOnce({
                user: {
                    id: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    name: 'Paranhos Ga',
                    email: 'john@example.com',
                    password: "123"
                }
            })
            .mockReturnValueOnce([
                {
                    bankName: "Vá de Taxi Bank",
                    bankAccountNumber: "32346254-1",
                    bankAccountAgency: '0001',
                    id: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e34765",
                }
            ])



        const result = createBank(props);
        expect(result.statusCode).toBe(400);
        expect(result.data).toBe("payload is invalid");

    });

    it('should return "bad request" for unauthenticated user', () => {
        const props = {
            payload: {
                bankName: "Vá de Taxi Bank",
                bankAccountNumber: "32346254-1",
                bankAccountAgency: '0001',
            }
        };

        jest.spyOn(UtilsModule, 'selectTable')
           .mockReturnValueOnce("")
        .mockReturnValueOnce([
            {
                bankName: "Vá de Taxi Bank",
                bankAccountNumber: "32346254-1",
                bankAccountAgency: '0001',
                userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e2",
            }
        ])



        const result = createBank(props);
        expect(result.statusCode).toBe(400);
        expect(result.data).toBe("bad request");

    });
   
})
