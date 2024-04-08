import { Response } from "express";
import { HttpMessage, HttpStatus } from "../common/enums";

export const sendResponseError = async (response: Response, str: string) => {
    return response.status(HttpStatus.Error).json({ status: HttpMessage.Error, error: str })
}

export const sendResponseErrorServer = async (response: Response) => {
    return response.status(HttpStatus.ErrorServer).json({ status: HttpMessage.ErrorServer })
}

export const sendResponseSuccess = async (response: Response, results: any, token?: string) => {
    return response.status(HttpStatus.Success).json({ status: HttpMessage.Sucess, data: results, token: token })
}   