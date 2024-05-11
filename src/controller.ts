import { IncomingMessage } from 'http';
import { routes } from './routes';
import { makeHttpRequest, selectTable } from './utils';

interface HandlerResponse {
    statusCode: number;
    data?: any;
    error?: string;
}

interface HandleRequestResult {
    statusCode: number;
    data?: any;
    error?: string;
}

async function handleRequest(req: IncomingMessage): Promise<HandlerResponse> {
    const { url, method } = req;
    if (url && method) {
        const urlParts = url.split("/");
        const path = `/${urlParts[1]}`;

        if (routes[path] && routes[path][method]) {
            try {
                const { handler, authIsMandatory } = routes[path][method];
                const authHeader = req.headers?.authorization;

                if (authIsMandatory && authHeader !== selectTable("auth")?.authToken || authIsMandatory && !authHeader) {
                    throw new Error("Not authorized");
                }

                const requestData = await makeHttpRequest(req);
                return handler(requestData);

            } catch (error: any) {
                return { statusCode: 500, error: error.message || 'Internal server error' };
            }
        } else {
            return { statusCode: 404, error: 'Invalid route or method' };
        }
    }
    return { statusCode: 400, error: 'dont exist route or method' };

}

export { handleRequest, HandleRequestResult };
