import { RequestHandler } from "express";
import * as _config from "../config";
import * as _model from '../models/config';
import AdminService from "../services/Admin.service";

class AdminController {

    adminLogin: RequestHandler = async (request, response) => {
        try {
            const admin: _model.Admin = request.body;
            const result = await AdminService.adminLogin(admin);
            _config.sendResponseSuccess(response, result);
        } catch (error) {
            _config.sendResponseError(response, error.message);
        }
    }

    adminRegister: RequestHandler = async (request, response) => {
        try {
            const admin: _model.Admin = request.body;
            const result = await AdminService.adminRegister(admin);
            _config.sendResponseSuccess(response, result);
        } catch (error) {
            _config.sendResponseError(response, error.message);
        }
    }
}

export default new AdminController();
