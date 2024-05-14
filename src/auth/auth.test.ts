import { AuthenticatorUser } from "./auth.services";
import * as UtilsModule from '../utils';


describe('AUTH', () => {
    it('should success login', () => {
        const props = {
            payload: {
                email: "gabriel@vadetaxi.com.br",
                password: "123"
            }
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue([
            {
                id: "1",
                name: "Gabriel Paranhos",
                email: "gabriel@vadetaxi.com.br",
                password: "123"

            },
            {
                id: "2",
                name: "Marcelo",
                email: "marcelo@vadetaxi.com.br",
                password: "323"
            }
        ]);

        const result = AuthenticatorUser(props);

        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('user');
        if (typeof result.data != "string" && result.data?.user) {
            expect(result.data.user).toHaveProperty('id');
            expect(result.data.user).toHaveProperty('email');
            expect(result.data.user).toHaveProperty('name');
        }
        expect(result.data).toHaveProperty('authToken');
    })
    it('should error message not found', () => {
        const props = {
            payload: {
                email: "gabriel@vadetaxi.com.br",
                password: "1234"
            }
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue([
            {
                id: "1",
                name: "Gabriel Paranhos",
                email: "gabriel@vadetaxi.com.br",
                password: "123"

            },
            {
                id: "2",
                name: "Marcelo",
                email: "marcelo@vadetaxi.com.br",
                password: "323"
            }
        ]);

        const result = AuthenticatorUser(props);

        expect(result.statusCode).toBe(404);
        expect(result.data).toBe('Not Found');
    })
    it('should error message internal db error', () => {
        const props = {
            payload: {
                email: "gabriel@vadetaxi.com.br",
                password: "123"
            }
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue(null);

        const result = AuthenticatorUser(props);

        expect(result.statusCode).toBe(500);
        expect(result.data).toBe('Internal Server Error');
    })
    it('should error message payload is invalid', () => {
        const props = {
            payload: {}
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue(null);

        const result = AuthenticatorUser(props);

        expect(result.statusCode).toBe(400);
        expect(result.data).toBe('Bad Request');
    })
})