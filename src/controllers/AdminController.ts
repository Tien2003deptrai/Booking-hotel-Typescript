import { RequestHandler } from "express";
import * as _config from "../config";
import * as _model from '../models/config';
import AdminService from "../services/Admin.service";
import jwt from 'jsonwebtoken';
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

    refreshToken: RequestHandler = async (request, response) => {
        try {
            const { refreshToken } = request.body;
            if (!refreshToken) {
                return _config.sendResponseError(response, 'Refresh token is required');
            }
            jwt.verify(refreshToken, process.env.SECRET_JWT_REFRESH, async (err: Error, decodedToken: any) => {
                if (err) {
                    return _config.sendResponseError(response, 'Error refresh');
                }
                const adminId = decodedToken.admin_id;
                const accessToken = await _config.generateTokenAccess(adminId);

                _config.sendResponseSuccess(response, { accessToken });
            });
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

}

export default new AdminController();
