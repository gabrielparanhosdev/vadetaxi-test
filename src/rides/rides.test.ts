
import * as UtilsModule from '../utils';
import { getRides, requestRide, updateRide } from './rides.services';

describe('REQUEST RIDE', () => {
    it("should success request ride for user", () => {
        const props = {
            payload: {
                from: "Aeroporto de guarulhos",
                to: "Rua maranhão"
            }
        }

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValueOnce([
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                },
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-02-10T21:53:04.158Z",
                    lastUpdate: "2024-02-10T21:53:04.158Z"
                }
            ])
            .mockReturnValueOnce({
                user: {
                    id: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    name: 'Paranhos Ga',
                    email: 'john@example.com',
                    password: "123"
                }
            });

        const result = requestRide(props)

        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('userId');
        expect(result.data).toHaveProperty('rideId');
        expect(result.data).toHaveProperty('from');
        expect(result.data).toHaveProperty('to');
        expect(result.data).toHaveProperty('created');
        expect(result.data).toHaveProperty('lastUpdate');
        expect(result.data).toHaveProperty('status');
    });
    it("should error message currente ride exist", () => {
        const props = {
            payload: {
                from: "Aeroporto de guarulhos",
                to: "Rua maranhão"
            }
        }

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValueOnce([
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "loading",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                },
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-02-10T21:53:04.158Z",
                    lastUpdate: "2024-02-10T21:53:04.158Z"
                }
            ])
            .mockReturnValueOnce({
                user: {
                    id: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    name: 'Paranhos Ga',
                    email: 'john@example.com',
                    password: "123"
                }
            });

        const result = requestRide(props)

        expect(result.statusCode).toBe(400);
        expect(result.data).toBe("current ride exist");
    });
    it("should error message payload is invalid", () => {
        const props = {
            payload: {}
        }

        const result = requestRide(props)

        expect(result.statusCode).toBe(400);
        expect(result.data).toBe("payload is invalid");
    });

})

describe('UPDATE RIDE', () => {
    it("should success cancelled ride", () => {
        const props = {
            payload: {
                status: "cancelled"
            },
            params: {
                rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c"
            }
        }

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValue([
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "loading",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                },
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-02-10T21:53:04.158Z",
                    lastUpdate: "2024-02-10T21:53:04.158Z"
                }
            ])

        jest.spyOn(UtilsModule, 'updateTable')
            .mockReturnValue(
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "cancelled",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                })

        const result = updateRide(props)

        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('userId');
        expect(result.data).toHaveProperty('rideId');
        expect(result.data).toHaveProperty('from');
        expect(result.data).toHaveProperty('to');
        expect(result.data).toHaveProperty('created');
        expect(result.data).toHaveProperty('lastUpdate');
        expect(result.data).toHaveProperty('status');
        expect(result.data).toHaveProperty('status', "cancelled");
    });
    it("should error cancelled ride return message ride is cancelled or done", () => {
        const props = {
            payload: {
                status: "cancelled"
            },
            params: {
                rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c"
            }
        }

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValue([
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "cancelled",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                },
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-02-10T21:53:04.158Z",
                    lastUpdate: "2024-02-10T21:53:04.158Z"
                }
            ])

        jest.spyOn(UtilsModule, 'updateTable')
            .mockReturnValue(
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "cancelled",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                })

        const result = updateRide(props)

        expect(result.statusCode).toBe(400);
        expect(result.data).toBe("ride is cancelled or done");
    });
    it("should error cancelled ride return message error update", () => {
        const props = {
            payload: {
                status: "cancelled"
            },
            params: {
                rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c"
            }
        }

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValue([
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "loading",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                },
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-02-10T21:53:04.158Z",
                    lastUpdate: "2024-02-10T21:53:04.158Z"
                }
            ])

        jest.spyOn(UtilsModule, 'updateTable')
            .mockReturnValue(null)

        const result = updateRide(props)

        expect(result.statusCode).toBe(500);
        expect(result.data).toBe("error update");
    });
    it("should error cancelled ride return message internal server error", () => {
        const props = {
            payload: {
                status: "cancelled"
            },
            params: {
                rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c"
            }
        }

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValue(null)

        jest.spyOn(UtilsModule, 'updateTable')
            .mockReturnValue(null)

        const result = updateRide(props)

        expect(result.statusCode).toBe(500);
        expect(result.data).toBe("internal server error");
    });
    it("should error cancelled ride return message payload or params is invalid", () => {
        const props = {
            payload: {},
            params: {}
        }

        const result = updateRide(props)

        expect(result.statusCode).toBe(400);
        expect(result.data).toBe("payload or params is invalid");
    });
})

describe('GET RIDE', () => {
    it("should success get all rides", () => {
        const props = {
            payload: {},
            params: {}
        };

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValue([
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "loading",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                },
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-02-10T21:53:04.158Z",
                    lastUpdate: "2024-02-10T21:53:04.158Z"
                }
            ]);

        const result = getRides(props)

        expect(result.statusCode).toBe(200);
        if (Array.isArray(result.data) && result.data?.length > 0) {
            expect(result.data[0]).toHaveProperty('userId');
            expect(result.data[0]).toHaveProperty('rideId');
            expect(result.data[0]).toHaveProperty('from');
            expect(result.data[0]).toHaveProperty('to');
            expect(result.data[0]).toHaveProperty('created');
            expect(result.data[0]).toHaveProperty('lastUpdate');
            expect(result.data[0]).toHaveProperty('status');
        }
    })
    it("should error return message internal server error", () => {
        const props = {
            payload: {},
            params: {}
        };

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValue(null);

        const result = getRides(props)

        expect(result.statusCode).toBe(500);
        expect(result.data).toBe('internal server error');
    })

    it("should success get ride by rideId", () => {
        const props = {
            payload: {},
            params: {
                rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c"
            }
        };

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValue([
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "loading",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                },
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-02-10T21:53:04.158Z",
                    lastUpdate: "2024-02-10T21:53:04.158Z"
                }
            ]);

        const result = getRides(props)

        expect(result.statusCode).toBe(200);
        expect(result.data).toHaveProperty('userId');
        expect(result.data).toHaveProperty('rideId');
        expect(result.data).toHaveProperty('from');
        expect(result.data).toHaveProperty('to');
        expect(result.data).toHaveProperty('created');
        expect(result.data).toHaveProperty('lastUpdate');
        expect(result.data).toHaveProperty('status');
    })
    it("should error get ride by rideId return message not found", () => {
        const props = {
            payload: {},
            params: {
                rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c2"
            }
        };

        jest.spyOn(UtilsModule, 'selectTable')
            .mockReturnValue([
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "loading",
                    created: "2024-05-10T21:53:04.158Z",
                    lastUpdate: "2024-05-10T21:53:04.158Z"
                },
                {
                    from: "Aeroporto de guarulhos",
                    to: "Rua maranhão",
                    userId: "031372f2-88d7-4ace-87c4-4ee5b6df4d4e",
                    rideId: "e6fee96e-866e-4f1a-92df-bb02c360f55c",
                    status: "done",
                    created: "2024-02-10T21:53:04.158Z",
                    lastUpdate: "2024-02-10T21:53:04.158Z"
                }
            ]);

        const result = getRides(props)

        expect(result.statusCode).toBe(404);
        expect(result.data).toBe('not found');
    })
})