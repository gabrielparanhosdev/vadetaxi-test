interface MakeRideResponse {
    from: string;
    to: string;
    userId: string;
    rideId: string;
    status: string;
    created: string;
    lastUpdate: string;
}
interface RideRequest {
    payload: {
        from?: string;
        to?: string;
    }
}

interface GetRide {
    params: {
        rideId?: string
    };
}
interface UpdateRide {
    params: {
        rideId?: string
    };
    payload: {
        from?: string;
        to?: string;
        status?: string;
        lastUpdate?: string;

    }
}

interface ResponseRide {
    statusCode: number;
    data?: MakeRideResponse | Array<MakeRideResponse> | string;
    error?: string;
}



export { RideRequest, GetRide, MakeRideResponse, ResponseRide, UpdateRide }