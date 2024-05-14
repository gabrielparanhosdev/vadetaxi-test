import { getReasonPhrase } from "http-status-codes";

export function getResponseError(statusCode: number) {
    return { statusCode, data: getReasonPhrase(statusCode) };
}

export function getResponseCatch(statusCode: number, error: any) {
    return { statusCode, error: error || getReasonPhrase(statusCode) };
}