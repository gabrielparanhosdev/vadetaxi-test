import { User } from "../types";
import { insertInTo, selectTable, updateTable } from "../utils";
import { GetRide, MakeRideResponse, ResponseRide, RideRequest, UpdateRide } from "./rides.types";

const { v4: uuidv4 } = require('uuid');

export function requestRide(props: RideRequest): ResponseRide {
  const { payload } = props;

  if (payload?.from && payload?.to) {

    const rides = selectTable("rides") || [];
    const responseAuth = selectTable("auth");
    const user: User = responseAuth.user;

    if (user && rides && rides.length > 0) {
      const findRide = rides.find((ride: MakeRideResponse) => ride.userId == user.id && (ride.status == "loading" || ride.status == "moving"));

      if (findRide) {
        return {
          data: "current ride exist",
          statusCode: 400
        };
      }
    }


    const Response: MakeRideResponse = {
      userId: user.id,
      from: payload.from,
      to: payload.to,
      rideId: uuidv4(),
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      status: "loading"
    };

    rides.push(Response);
    insertInTo("rides", rides);

    return {
      statusCode: 200,
      data: Response
    }
  }

  return {
    data: "payload is invalid",
    statusCode: 400
  };
}

export function updateRide(props: UpdateRide): ResponseRide {
  const { payload, params } = props;
  // aqui poderiamos implementar no mesmo payload a logica de aceite ou cancelamento por parte do motorista
  // verificar se já está cancelado para não deixar fazer outras ações.

  if (
    params?.rideId &&
    (payload?.status && (
      payload.status === "cancelled" ||
      payload.status === "loading" ||
      payload.status === "moving" ||
      payload.status === "done"
    ) || !payload?.status)
  ) {

    payload["lastUpdate"] = new Date().toISOString();
    const rides = selectTable("rides");

    if (rides) {
      const findRide = rides.find((ride: MakeRideResponse) => ride.rideId == params.rideId);

      if (
        !findRide ||
        findRide.status === "cancelled" ||
        findRide.status === "done" ||
        (payload?.from != findRide.from &&
          findRide.status !== "loading") ||
        (payload?.to != findRide.to &&
          findRide.status !== "loading")
      ) {
        return {
          data: "ride is cancelled, done, not found or can't possibilite change",
          statusCode: 400
        };
      }

      const resUpdate = updateTable('rides', payload, params, "rideId");
      if (resUpdate) {
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
      data: "internal server error",
      statusCode: 500
    };
  }

  return {
    data: "payload or params is invalid",
    statusCode: 400
  };
}

export function getRides(props: GetRide): ResponseRide {
  const { params } = props;
  const rides = selectTable("rides");
  if (rides && rides.length > 0) {
    if (params?.rideId) {
      const findRide = rides && rides.length > 0 && rides.find((ride: MakeRideResponse) => ride.rideId == params.rideId);

      if (findRide) {
        return {
          data: findRide,
          statusCode: 200
        }
      } else {
        return {
          data: "not found",
          statusCode: 404
        };
      }
    }

    return {
      data: rides,
      statusCode: 200
    };
  }

  return {
    data: "internal server error",
    statusCode: 500
  };
}
