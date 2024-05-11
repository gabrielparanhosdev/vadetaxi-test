import { RequestRide, ResponseRide, Ride } from "./rides.types";

const { v4: uuidv4 } = require('uuid');
const { selectTable, insertInTo, updateTable } = require("../utils/fake-db");

export function requestRide(props: RequestRide): ResponseRide {
  const { payload } = props;

  if (payload?.from && payload?.to) {

    const rides = selectTable("rides", []);
    const { user } = selectTable("auth");

    if (user && rides.length > 0) {
      const findRide = rides.find((ride: Ride) => ride.userId == user.id && (ride.status == "loading" || ride.status == "moving"));

      if (findRide) {
        return {
          data: "current ride exist",
          statusCode: 400
        };
      }
    }


    payload["userId"] = user.id
    payload["rideId"] = uuidv4();
    payload["status"] = "loading"
    payload["created"] = new Date().toISOString();
    payload["lastUpdate"] = new Date().toISOString();

    rides.push(payload);
    insertInTo("rides", rides);

    return {
      statusCode: 200,
      data: payload
    }
  }

  return {
    data: "payload is invalid",
    statusCode: 400
  };
}

export function updateRide(props: RequestRide): ResponseRide {
  const { payload, params } = props;
  // aqui poderiamos implementar no mesmo payload a logica de aceite por parte do motorista
  // verificar se já está cancelado para não deixar fazer outras ações.

  if (
    params?.rideId &&
    payload?.status && (
      payload.status === "cancelled" ||
      payload.status === "loading" ||
      payload.status === "moving" ||
      payload.status === "done"
    )
  ) {

    payload["lastUpdate"] = new Date().toISOString();
    const rides = selectTable("rides");
    
    if (rides) {
      const findRide = rides.find((ride: Ride) => ride.rideId == params.rideId);

      if (findRide?.status === "cancelled") {
        return {
          data: "error update",
          statusCode: 400
        };
      }
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
    data: "payload is invalid",
    statusCode: 400
  };
}

export function getRides(props: RequestRide): ResponseRide {
  const { params } = props;
  const rides = selectTable("rides", []);

  if (params?.rideId) {
    const findRide = rides.find((ride: Ride) => ride.rideId == params.rideId);

    if (findRide) {
      return {
        data: findRide,
        statusCode: 200
      }
    } else {
      return {
        data: "ride not found",
        statusCode: 404
      };
    }
  }

  return {
    data: rides,
    statusCode: 200
  };
}
