import { User } from "../types";

interface CreateUserRequest {
    payload: User
}

interface GetUser {
    params: {
        id: string
    }
}

interface UpdateUser {
    payload: {
        name: string;
        email: string;
        password: string;
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

export {
    DeleteUser,
    CreateUserRequest,
    GetUser,
    UpdateUser
}