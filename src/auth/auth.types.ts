import { User } from "../types";

interface AuthRequest {
    payload: {
        email?: string,
        password?: string
    }
}

interface ResponseAuth {
    statusCode: number;
    data?: {
        user: User,
        authToken: string
    } | string;
    error?: string;
}

export { AuthRequest, ResponseAuth }