import { Middleware, Action } from "redux";
import CALL_API from './src/CALL_API';

interface BailoutCallback {
    (state: object): boolean
}

interface PayloadCallback {
    (action: Action, state: object): object
}

interface MetaCallback {
    (action: Action, state: object, response: object): object
}

type Meta = object | MetaCallback;

interface TypeDescriptor {
    type: string;
    payload?: PayloadCallback,
    meta?: Meta
}

type HTTPMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
type Type = string | TypeDescriptor;
type RequestBody = Blob | BufferSource | FormData | URLSearchParams | USVString;

interface RSAAProperties {
    endpoint: string;
    method: HTTPMethod;
    types: Type[];
    body?: RequestBody
    headers?: {
        [key: string]: string
    };
    credentials?: "omit" | "same-origin" | "include";
    bailout: boolean | BailoutCallback
}

export const CALL_API: symbol;

export interface RSAA {
    [CALL_API]: RSAAProperties
}

export function isRSAA(action: any): boolean;
export function validateRSAA(action: any): string[];
export function isValidRSAA(action: any): boolean;

export class InvalidRSAA extends Error {
    constructor(validationErrors: string[]);
    name: string;
    message: string
}

export class InternalError extends Error {}
export class RequestError extends Error {}

export class ApiError extends Error {
    constructor(status: number, statusText: string, response: object);
    status: number;
    statusText: string;
    response: object
}

export function getJSON(response: object): Promise<any> | undefined;

export const apiMiddleware: Middleware;
