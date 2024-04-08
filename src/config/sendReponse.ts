import { Response } from "express";

export const sendResponseError = async (response: Response, str: string) => {
    return response.status(400).json({ status: false, error: str })
}

export const sendResponseSuccess = async (response: Response, results: any, token?: string) => {
    return response.status(200).json({ status: true, data: results, token: token })
}