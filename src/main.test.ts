import request from 'supertest';
import { createServer } from "./main";

const server = createServer();

it('should respond with correct data on successful request', async () => {
    const newUser = {
        name: 'Gabriel',
        email: 'gabriel@vadetaxi.com.br',
        password: '123456'
    };

    const response = await request(server)
    .post('/users')
    .send(newUser);

    // Verifica se a resposta está correta com os dados esperados
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("id");
});

it('should respond Not authorized', async () => {
    const response = await request(server)
    .post('/rides');

    // Verifica se a resposta está correta com os dados esperados
    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Not authorized");
});

it('should respond other error', async () => {
    const newUser = {
        name: 'Gabriel',
        email: 'gabriel@vadetaxi.com.br'
    };

    const response = await request(server)
    .post('/users')
    .send(newUser);

    // Verifica se a resposta está correta com os dados esperados
    expect(response.status).toBe(400);
    expect(response.body.data).toBe("payload is invalid");
});