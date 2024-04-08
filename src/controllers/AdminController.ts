import { RequestHandler } from "express";
import { QueryTypes } from "sequelize";
import * as _model from '../models/config';
import * as _config from "../config";

import bcrypt from 'bcrypt';

class AdminController {
    adminLogin: RequestHandler = async (request, response) => {
        try {
            const admin: _model.Admin = request.body;
            if (!admin.admin_email || !admin.admin_password) {
                _config.sendResponseError(response, 'Not found email or password ...');
                return;
            }
            const sql = 'SELECT * FROM admin WHERE admin_email = ?';
            const results = await _config.executeQuery(sql, [admin.admin_email]);
            if (results.length > 0) {
                const admin_exist = results[0];
                bcrypt.compare(admin.admin_password, admin_exist.admin_password, async (err: any, result: boolean) => {
                    if (result) {
                        const token = await _config.generateToken(admin_exist.admin_id);
                        response.status(200).json({ message: "Login successful", token: token });
                    } else {
                        response.status(401).send("Invalid password");
                    }
                });
            } else {
                response.status(404).send("User not found");
            }
        } catch (error) {
            console.error(error);
            _config.sendResponseError(response, 'Internal Server Error ...');
        }
    }

    adminRegister: RequestHandler = async (request, response) => {
        try {
            const admin: _model.Admin = request.body;
            bcrypt.hash(admin.admin_password, 10, async (err, hash) => {
                if (err) {
                    console.error(err);
                    _config.sendResponseError(response, "Error hashing password");
                    return;
                }
                try {
                    const sql = "INSERT INTO admin (admin_name, admin_email, admin_password, hotel_id) VALUES (?, ?, ?, ?)";
                    await _config.executeQuery(sql, [admin.admin_name, admin.admin_email, hash, admin.hotel_id], QueryTypes.INSERT);
                    response.status(200).send("User registered successfully");
                } catch (error) {
                    console.error(error);
                    _config.sendResponseError(response, "Error registering user");
                }
            });
        } catch (error) {
            _config.sendResponseError(response, "Internal Server Error");
        }
    }
}

export default new AdminController();