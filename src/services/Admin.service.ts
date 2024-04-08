import { QueryTypes } from "sequelize";
import * as _model from '../models/config';
import * as _config from "../config";
import bcrypt from 'bcrypt';

class AdminService {
    async adminLogin(admin: _model.Admin): Promise<any> {
        try {
            if (!admin.admin_email || !admin.admin_password) {
                throw new Error('Not found email or password ...');
            }
            const sql = 'SELECT * FROM admin WHERE admin_email = ?';
            const results = await _config.executeQuery(sql, [admin.admin_email]);
            if (results.length > 0) {
                const admin_exist = results[0];
                const match = await bcrypt.compare(admin.admin_password, admin_exist.admin_password);
                if (match) {
                    const token = await _config.generateToken(admin_exist.admin_id);
                    return { message: "Login successful", token: token };
                } else {
                    throw new Error("Invalid password");
                }
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error(error);
            throw new Error('Internal Server Error ...');
        }
    }

    async adminRegister(admin: _model.Admin): Promise<string> {
        try {
            const hashedPassword = await bcrypt.hash(admin.admin_password, 10);
            const sql = "INSERT INTO admin (admin_name, admin_email, admin_password, hotel_id) VALUES (?, ?, ?, ?)";
            await _config.executeQuery(sql, [admin.admin_name, admin.admin_email, hashedPassword, admin.hotel_id], QueryTypes.INSERT);
            return "User registered successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Error registering user");
        }
    }
}

export default new AdminService();