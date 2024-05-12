import { User, UserRequest } from "../types";

interface CreateUserRequest {
    payload: UserRequest
}

interface GetUser {
    params: {
        id?: string
    }
}

interface UpdateUser {
    payload: {
        name?: string;
        email?: string;
        password?: string;
    }
    params: {
        id?: string
    }
}

interface DeleteUser {
    params: {
        id?: string
    }
}

interface ResponseServiceUser {
    statusCode: number;
    data?: string | User | Array<User>;
    error?: string;
}

export {
    DeleteUser,
    CreateUserRequest,
    GetUser,
    UpdateUser,
    ResponseServiceUser
}