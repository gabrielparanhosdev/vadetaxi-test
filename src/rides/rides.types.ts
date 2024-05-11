interface Ride {
    from: string;
    to: string;
    userId: string;
    rideId: string;
    status: string;
    created: string;
    lastUpdate: string;
}

interface RequestRide {
    payload: Ride;
    params: {
        rideId?: string
    }
}

interface ResponseRide{
    statusCode: number;
    data?: Ride | Array<Ride> | string;
    error?: string;
}



export { RequestRide, Ride, ResponseRide }