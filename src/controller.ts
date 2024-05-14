import { IncomingMessage } from 'http';
import { routes } from './routes';
import { makeHttpRequest, selectTable } from './utils';
import { ResponseService } from './types';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { getResponseCatch, getResponseError } from './utils/http';

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
                    throw getReasonPhrase(StatusCodes.UNAUTHORIZED)
                }
                
                try {
                    const requestData = await makeHttpRequest(req);
                    return handler(requestData);
                } catch (error: any) {
                    throw error;
                }

            } catch (error: any) {
                return getResponseCatch(StatusCodes.INTERNAL_SERVER_ERROR, error);
            }
        } else {
            return getResponseError(StatusCodes.NOT_FOUND);
        }
    }
    return getResponseError(StatusCodes.METHOD_NOT_ALLOWED);
}

export { handleRequest };
