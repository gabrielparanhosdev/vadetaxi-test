import { IncomingMessage } from 'http';
import { routes } from './routes';
import { makeHttpRequest, selectTable } from './utils';
import { ResponseService } from './types';

async function handleRequest(req: IncomingMessage): Promise<ResponseService> {
    const { url, method } = req;
    if (typeof url == "string" && typeof method == "string") {
        const urlParts = url.split("/");
        const path = `/${urlParts[1]}`;

        if (routes[path] && routes[path][method]) {
            try {
                const { handler, authIsMandatory } = routes[path][method];
                const authHeader = req.headers?.authorization;

                if (authIsMandatory && authHeader !== selectTable("auth")?.authToken || authIsMandatory && !authHeader) {
                    throw "Not authorized";
                }
                
                try {
                    const requestData = await makeHttpRequest(req);
                    return handler(requestData);
                } catch (error) {
                    throw error;
                }

            } catch (error: any) {
                return { statusCode: 500, error: error || 'Internal server error' };
            }
        } else {
            return { statusCode: 404, data: "not found" };
        }
    }
    return { statusCode: 400, data: 'dont exist route or method' };

}

export { handleRequest };
