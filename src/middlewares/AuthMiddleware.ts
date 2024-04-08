import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';

class AuthMiddleware {
    verifyToken: RequestHandler = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) return res.status(401).json({ error: "Unauthorized" })

            const token = authHeader.split(' ')[1];

            if (!token) return res.status(401).json({ error: "Unauthorized" })

            jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ error: 'Forbidden' });
                }
                next();
            });

        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
}
export default new AuthMiddleware();