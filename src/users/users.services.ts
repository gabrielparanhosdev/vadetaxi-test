import { ResponseService, User } from "../types";
import { insertInTo, selectTable, updateTable } from "../utils";
import { CreateUserRequest, DeleteUser, GetUser, ResponseServiceUser, UpdateUser } from "./users.types";

const { v4: uuidv4 } = require('uuid');


export function createUser(props: CreateUserRequest): ResponseService {

  const { payload } = props;

  if (payload && payload?.name && payload?.email && payload?.password) {

    const users = selectTable("users") || [];

    payload["id"] = uuidv4();
    users.push(payload);

    insertInTo('users', users)

    const { name, email, id } = payload

    return {
      data: {
        name,
        email,
        id
      },
      statusCode: 200
    };
  }

  return {
    data: "payload is invalid",
    statusCode: 400
  };


}

export function getUsers(props: GetUser): ResponseServiceUser {
  const { params } = props;
  const users = selectTable("users");

  if (!users || users.length == 0) {
    return {
      data: "Dont exist users, please insert new user!",
      statusCode: 400
    }
  }

  if (params?.id) {
    const findUser = users.find((user: User) => user.id == params.id);

    if (findUser) {

      delete findUser["password"];

      return {
        data: findUser,
        statusCode: 200
      }
    }

    return {
      data: "user not found",
      statusCode: 404
    }
  }

  return {
    data: users.map((user: User) => {
      const { name, email, id } = user;
      return {
        name,
        email,
        id
      }
    }),
    statusCode: 200
  };
}

export function updateUser(props: UpdateUser): ResponseServiceUser {
  const { params, payload } = props;

  if (params?.id && payload && Object.keys(payload).length > 0) {
    const resUpdate = updateTable('users', payload, params, "id");
    if (resUpdate) {

      delete resUpdate.password

      return {
        data: resUpdate,
        statusCode: 200
      }
    } else {
      return {
        data: "error update",
        statusCode: 500
      };
    }
  }

  return {
    data: "bad request",
    statusCode: 400
  }
}

export function deleteUser(props: DeleteUser): ResponseService {
  const { params } = props;
  if (params?.id) {
    const users = selectTable("users");

    if (users) {
      const newUsers = users.filter((user: User) => user.id !== params.id);

      if (newUsers.length > 0) {
        insertInTo('users', newUsers);

        return {
          data: "no content",
          statusCode: 201
        }
      } else {
        return {
          data: "internal error",
          statusCode: 500
        }
      }
    }

    return {
      data: "Users Not found",
      statusCode: 404
    }

  }

  return {
    data: "bad request",
    statusCode: 400
  }
}

