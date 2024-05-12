import { AuthenticatorUser } from "./auth/auth.services";
import { getRides, requestRide, updateRide } from "./rides/rides.services";
import { createUser, deleteUser, getUsers, updateUser } from "./users/users.services";

interface Routes {
    [path: string]: {
        [method: string]: {
            handler: Function,
            authIsMandatory: boolean
        }
    }
}

// all users
const USERS = "/users";
const USERSs = "/users/";

// user by id
const USERSBYID = "/users/:id";
const USERSBYIDs = "/users/:id/";

// all rides
const RIDE = "/rides";
const RIDEs = "/rides/";

// ride action
const RIDE_ACTION = "/rides/:rideId";
const RIDE_ACTIONs = "/rides/:rideId/";

// auth
const AUTH = "/auth";
const AUTHs = "/auth/";

export const urlBases = [
    USERS,
    USERSBYID,
    USERSs,
    USERSBYIDs,
    RIDE,
    RIDEs,
    RIDE_ACTION,
    RIDE_ACTIONs,
    AUTH,
    AUTHs
];

export const routes: Routes = {
    '/users': {
        POST: { handler: createUser, authIsMandatory: false },
        GET: { handler: getUsers, authIsMandatory: true },
        PUT: { handler: updateUser, authIsMandatory: true },
        DELETE: { handler: deleteUser, authIsMandatory: true }
    },
    '/rides': {
        POST: { handler: requestRide, authIsMandatory: true },
        GET: { handler: getRides, authIsMandatory: true },
        PUT: { handler: updateRide, authIsMandatory: true }
    },
    '/auth': {
        POST: { handler: AuthenticatorUser, authIsMandatory: false }
    }
};