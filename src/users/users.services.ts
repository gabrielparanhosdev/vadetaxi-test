import { ResponseService, User } from "../types";
import { CreateUserRequest, DeleteUser, GetUser, UpdateUser} from "./users.types";

const { v4: uuidv4 } = require('uuid');
const { updateTable, selectTable, insertInTo } = require('../utils/fake-db');


export function createUser(props: CreateUserRequest): ResponseService {

  const { payload } = props;

  if (payload?.name && payload?.email && payload?.password) {

    const users = selectTable("users", []);
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

export function getUsers(props: GetUser): ResponseService {
  const { params } = props;
  const users = selectTable("users");

  if (!users) {
    return {
      data: "Dont exist users, please insert new user!",
      statusCode: 404
    }
  }

  if (params?.id) {
    const findUser = users.find((user: User) => user.id == params.id);

    if (findUser) {
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
    data: users,
    statusCode: 200
  };
}

export function updateUser(props: UpdateUser): ResponseService {
  const { params, payload } = props;

  if (params?.id) {
    const resUpdate = updateTable('users', payload, params, "id");
    if (resUpdate) {
      return {
        data: payload,
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

      if (newUsers) {
        insertInTo('users', newUsers);

        return {
          data: "no content",
          statusCode: 201
        }
      } else {
        return {
          data: "User Not found",
          statusCode: 404
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

