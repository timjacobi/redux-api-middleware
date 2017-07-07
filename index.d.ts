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

type Type = string | TypeDescriptor;

interface RSAABody {
    endpoint: string;
    method: string;
    types: Type[];
    body?: any
    headers?: {
        [key: string]: string
    };
    credentials?: RequestCredentials;
    bailout: boolean | BailoutCallback
}

export const CALL_API: symbol;

export interface RSAA {
    [CALL_API]: RSAABody
}

export function isRSAA(action: object): boolean;
export function validateRSAA(action: object): string[];
export function isValidRSAA(action: object): boolean;

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
