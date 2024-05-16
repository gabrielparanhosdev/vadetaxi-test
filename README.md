# Vá de Taxi
Nós da Vá de taxi decidimos criar um projeto utilizando Node.js como back-end, o projeto foi inteiramente tipado utilizando typescript, também oferece testes unitarios e teste automatizado via postman.

<img src="https://vadetaxi.com.br/wp-content/uploads/2022/11/logotipo_header-menu-novo.png" alt="Vá de taxi" width="100%"/>

## Link do back-end em produção
https://teste.paranhos.cloud/


## Passo 1: Configuração de ambiente
O projeto é baseado em `node.js` portando certifique-se de ter o `node` instalado em sua máquina ou acesse o [link](https://nodejs.org/en), recomendamos também a instalação global do `TypeScript`, após instalar o `node` execute o seguinte comando `npm install -g typescript`.

## Passo 2: Rodando o projeto
Recomendamos que você utilize o `visual studio code` para visualisar o código, editar e executa-lo, após baixar o zip do projeto ou clona-lo você pode executar o comando `npm run start` como projeto é baseado em `typescript` ele irá executar o `build` e depois acessar a `main.js` dentro da `/dist/`.

## Comandos
Comando para iniciar o projeto
```
npm run start
```

Comando para testar
```
npm run test
```

## Realizando requisição
### CRUD de usuário
#### Criando usuário
A criação de usuário é necessaria para login que consecutivamente é necessario para realizar solicitações de viagens com taxi
```
curl --location 'http://localhost:4000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Gabriel Paranhos",
    "email": "gabriel@vadetaxi.com.br",
    "password": "1234"
}'
```

#### Edição de usuário
```
curl --location --request PUT 'http://localhost:4000/users/userId' \
--header 'Authorization: AuthToken' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Gabriel",
    "email": "gabriel@vadetaxi.com.br"
}'
```

#### Verificar usuario ou usuarios
Para ver todos os usuario envie uma solicitação usando apenas `/users`
```
curl --location --request GET 'http://localhost:4000/users/userId' \
--header 'Authorization: AuthToken' \
--header 'Content-Type: application/json' \
```

#### Deletar usuario
```
curl --location --request DELETE 'http://localhost:4000/users/userId' \
--header 'Authorization: AuthToken' \
--header 'Content-Type: application/json' \
```

#### Auth | Login
```
curl --location 'http://localhost:4000/auth/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "gabriel@vadetaxi.com.br",
    "password": "1234"
}'
```
----

### CRUD Viagens
#### Solicitação de viagem
A regra é que só é possivel solicitar viagem se o usuário não possuir viagem em andamento
```
curl --location 'http://localhost:4000/rides' \
--header 'Authorization: AuthToken' \
--header 'Content-Type: application/json' \
--data '{
    "from": "Aeroporto de guarulhos",
    "to": "Rua maranhão2"
}'
```

#### Cancelando viagem
A regra é o usuário só pode cancelar viagens que estão com status de `loading`.
```
curl --location --request PUT 'http://localhost:4000/rides/rideId' \
--header 'Authorization: AuthToken' \
--header 'Content-Type: application/json' \
--data '{
    "from": "Aeroporto de guarulhos",
    "to": "Rua maranhão 2",
    "status": "cancelled"
}'
```

#### Alterar viagem
A regra é que o usuario só pode realizar alteração na viagem se ela ainda não estiver em andamento
```
curl --location --request PUT 'http://localhost:4000/rides/rideId' \
--header 'Authorization: AuthToken' \
--header 'Content-Type: application/json' \
--data '{
    "from": "Aeroporto de guarulhos",
    "to": "Rua maranhão"
}'
```

## Bibliotecas e decições de estrutura de código
### Bibliotecas
- `jest-mock-extended`: utilizamos para mockar os dados para test.
- `jsonwebtoken`: utilizamos para gerar chave autenticada
- `node-cache`: utilizamos para simular um banco dados usando memoria
- `uuid`: Utilizamos para gerar Id
- `@types/jest`: Utilizamos para obter definições de tipo para o framework de testes Jest
- `@types/node`: Utilizamos para obter definições de tipo para todos os módulos nativos do Node.js
- `@types/supertest`: Utilizamos para obter tipo para  APIs HTTP em Node.js
- `jest`: framework de testes unitarios
- `supertest`: Utilizamos para realizar teste com APIs HTTP em Node.js
- `ts-jest`: Permite escrever arquivos de testes com TypeScript
- `typescript`: Estende a sintaxe do JavaScript, adicionando recursos como tipos estáticos, interfaces, enums, decorators e muito mais. 

### Sobre o desenvolvimento
#### Por que criamos a função handleRequest?
Nós criamos a função `handleRequest` afim de incapsular as rotas em uma unica função, sendo assim recebemos a requisição de pelo path e verbo podemos ter mais flexibilidade para criar diversas rotas sem precisar fazer isso em cada uma.

#### Por que criamos o makeHttpRequest?
Criamos ele pois ele pega elementos da url baseado em um `baseUrl` definido por nós na paginas `routes.ts`, ele envia para o handler um objeto padronizado.
Exemplo:
```
PUT http://localhost:4000/users/w182761wyt
body: {
    name: "Gabriel",
    email: "gabriell@vadetaxi.com.br"
}

Objeto padronizado:
{
    payload: {
        name: "Gabriel",
        email: "gabriell@vadetaxi.com.br"
    },
    params:{
        id: w182761wyt
    }
}
```

#### O que é getBaseUrl?
Criamos essa função para buscar qual é o baseUrl mais adequaedo para aquiela requisição em questão.

#### O que é um baseUrl?
baseUrl é assim: `/users/:id`, assim podemos transformar facilmente em objeto 😎.

#### Como adicionar uma nova rota?
Simples, basta navegar até `routes.ts`, lá você deve criar as constantes com os baseUrls que você quer, depois basta adicionar essas contantes na lista de baseUrls e depois na contante de routes você vai especificar sua rota, verbo e se é uma rota autenticada.
Exemplo:
```
export const CARS = "/cars";
export const CARSs = "/cars/";

export const urlBases = [CARS, CARSs];


export const routes: Routes = {
    '/cars': {
        POST: { handler: createCars, authIsMandatory: false },
        GET: { handler: getCars, authIsMandatory: true },
        PUT: { handler: updateCars, authIsMandatory: true },
        DELETE: { handler: deleteCars, authIsMandatory: true }
    }
}
```