import { AuthenticatorUser } from "./auth/auth.services";
import { createBank, deleteBank, getBank, updateBank } from "./bank/bank.services";
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
export const USERS = "/users";
export const USERSs = "/users/";

// user by id
export const USERSBYID = "/users/:id";
export const USERSBYIDs = "/users/:id/";

// all rides
export const RIDE = "/rides";
export const RIDEs = "/rides/";

// ride action
export const RIDE_ACTION = "/rides/:rideId";
export const RIDE_ACTIONs = "/rides/:rideId/";

// auth
export const AUTH = "/auth";
export const AUTHs = "/auth/";

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
    '/bank': {
        POST: { handler: createBank, authIsMandatory: true },
        GET: { handler: getBank, authIsMandatory: true },
        PUT: { handler: updateBank, authIsMandatory: true },
        DELETE: { handler: deleteBank, authIsMandatory: true }
    },
    // '/bank-transaction': {
    //     POST: { handler: sendTransactionBank, authIsMandatory: true },
    //     GET: { handler: getTransactionBank, authIsMandatory: true },
    // },
    '/auth': {
        POST: { handler: AuthenticatorUser, authIsMandatory: false }
    }
};