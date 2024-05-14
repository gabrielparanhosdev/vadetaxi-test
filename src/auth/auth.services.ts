import { User } from "../types";
import { insertInTo, selectTable } from "../utils";
import { AuthRequest, ResponseAuth } from "./auth.types";
require('dotenv').config();

const jwt = require('jsonwebtoken');

export function AuthenticatorUser(props: AuthRequest): ResponseAuth {
    const { payload } = props;

    if (payload?.email && payload?.password) {
        const users = selectTable("users");

        if (users) {
            const user = users.find((user: User) => user.email == payload.email && user.password == payload.password);

            if (user) {
                const dataJwt = { userId: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60) };
                const authToken = jwt.sign(dataJwt, process.env.SECRET);

                insertInTo("auth", { authToken, user });

                delete user.password

                return {
                    data: {
                        user,
                        authToken
                    },
                    statusCode: 200
                }
            }

            return {
                data: "not found",
                statusCode: 404
            }
        }

        return {
            data: "internal db error",
            statusCode: 500
        }
    }
    return {
        data: "payload is invalid",
        statusCode: 400
    }
}
