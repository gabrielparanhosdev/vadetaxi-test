import { ResponseService } from "../types";
import { createUser, getUsers, updateUser, deleteUser } from "./users.services";
import * as UtilsModule from '../utils';

jest.mock('../utils/fake-db', () => ({
    selectTable: jest.fn(),
    insertInTo: jest.fn(),
    updateTable: jest.fn(),
}));

describe('CREATE USER', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Create user success', () => {
        const props = {
            payload: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            },
        };

        const result: ResponseService = createUser(props);
        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('id');
        expect(result.data.name).toBe('John Doe');
        expect(result.data.email).toBe('john@example.com');
    });

    it('Error create user payload invalid', () => {
        const props = {
            payload: {
                name: 'John Doe'
            },
        };

        const result: ResponseService = createUser(props);

        expect(result.statusCode).toBe(400);
        expect(result.data).toBe('payload is invalid');
    });


});

describe('GET USERs', () => {
    it('should return all users', () => {
        const props = {
            params: {}
        };

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue([
            { id: '1', name: 'Alice', email: 'alice@example.com', password: 'pass123' },
            { id: '2', name: 'Bob', email: 'bob@example.com', password: 'pass456' }
        ]);

        const result = getUsers(props);
        expect(result.statusCode).toBe(200);
        expect(Array.isArray(result.data)).toBe(true);

        if (Array.isArray(result.data)) {
            expect(result.data[0]).toHaveProperty('id', '1');
            expect(result.data[0]).toHaveProperty('name', 'Alice');
            expect(result.data[0]).toHaveProperty('email', 'alice@example.com');
        }
    });

    it('should return message users dont exist', () => {
        // Simulate no users existing
        const props = {
            params: {}
        };

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue([]);

        const result = getUsers(props);
        expect(result.statusCode).toBe(400);
        expect(result.data).toBe("Dont exist users, please insert new user!");
    });

    it('should return user by id', () => {
        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue([
            { id: '1', name: 'Alice', email: 'alice@example.com', password: 'pass123' },
            { id: '2', name: 'Bob', email: 'bob@example.com', password: 'pass456' }
        ]);

        const props = {
            params: { id: '1' }
        };

        const result = getUsers(props);
        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('id', '1');
        expect(result.data).toHaveProperty('name', 'Alice');
        expect(result.data).toHaveProperty('email', 'alice@example.com');
    });

    it('should return message user not found', () => {
        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue([
            { id: '1', name: 'Alice', email: 'alice@example.com', password: 'pass123' },
            { id: '2', name: 'Bob', email: 'bob@example.com', password: 'pass456' }
        ]);

        const props = {
            params: { id: '3' } // Invalid id
        };

        const result = getUsers(props);
        expect(result.statusCode).toBe(404);
        expect(result.data).toBe('user not found');
    });
});

describe('UPDATE USER', () => {
    it('should return success update ', () => {
        const props = {
            params: {
                id: "1"
            },
            payload: {
                name: "Gabriel Paranhos",
            }
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'updateTable');
        selectTableMock.mockReturnValue({
            id: "1",
            name: "Gabriel Paranhos",
            email: "gabriel@vadetaxi.com.br",
        });

        const result = updateUser(props);
        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('id');
        expect(result.data).toHaveProperty('email');
        expect(result.data).toHaveProperty('name');
    })
    it('should return error update internal', () => {
        const props = {
            params: {
                id: "1"
            },
            payload: {
                name: "Gabriel Paranhos",
            }
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'updateTable');
        selectTableMock.mockReturnValue(null);

        const result = updateUser(props);
        expect(result.statusCode).toBe(500);
        expect(result.data).toBe('error update');
    })
    it('should return error update params invalid', () => {
        const props = {
            params: {},
            payload: {}
        }

        const result = updateUser(props);
        expect(result.statusCode).toBe(400);
        expect(result.data).toBe('bad request');
    })
    it('should return error update payload invalid', () => {
        const props = {
            params: {
                id: "2"
            },
            payload: {}
        }

        const result = updateUser(props);
        expect(result.statusCode).toBe(400);
        expect(result.data).toBe('bad request');
    })
})

describe('DELETE USER', () => {
    it("should return success delete user", () => {
        const props = {
            params:{
                id: "3"
            }
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue([
            {
                id: "1",
                name: "Gabriel Paranhos",
                email: "gabriel@vadetaxi.com.br",
            },
            {
                id: "2",
                name: "Gabriel Paranhos",
                email: "gabriel@vadetaxi.com.br",
            },
            {
                id: "3",
                name: "Gabriel Paranhos",
                email: "gabriel@vadetaxi.com.br",
            }
        ]);

        const result = deleteUser(props);
        expect(result.statusCode).toBe(201);
        expect(result.data).toBe('no content');

    })

    it("should return error message internal error", () => {
        const props = {
            params:{
                id: "3"
            }
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue([]);

        const result = deleteUser(props);
        expect(result.statusCode).toBe(500);
        expect(result.data).toBe('internal error');
    });

    it("should return error message users not found", () => {
        const props = {
            params:{
                id: "3"
            }
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue(null);

        const result = deleteUser(props);
        expect(result.statusCode).toBe(404);
        expect(result.data).toBe('Users Not found');
    })
    it("should return error message params invalid", () => {
        const props = {
            params:{}
        }

        const selectTableMock = jest.spyOn(UtilsModule, 'selectTable');
        selectTableMock.mockReturnValue(null);

        const result = deleteUser(props);
        expect(result.statusCode).toBe(400);
        expect(result.data).toBe('bad request');
    })
})