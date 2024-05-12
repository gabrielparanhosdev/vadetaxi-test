
interface ResponseService {
    statusCode: number;
    data?: any;
    error?: string;
}

interface User {
    name: string;
    email: string;
    password: string;
    id: string
    // Adicione outros campos do usuário conforme necessário
}
interface UserRequest {
    name?: string;
    email?: string;
    password?: string;
    id?: string
    // Adicione outros campos do usuário conforme necessário
}


export {
    User,
    UserRequest,
    ResponseService,
}