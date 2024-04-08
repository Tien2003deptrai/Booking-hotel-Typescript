import { RequestHandler } from "express";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

class AuthMiddleware {
    verifyToken: RequestHandler = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const token = authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            try {
                const decodedToken = jwt.verify(token, process.env.SECRET_JWT) as { [key: string]: any };

                if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
                    return res.status(401).json({ error: "Token expired" });
                }

                if (decodedToken.nbf && Date.now() < decodedToken.nbf * 1000) {
                    return res.status(401).json({ error: "Token not yet valid" });
                }

                // req.users = decodedToken;

                next();
            } catch (err) {
                if (err instanceof TokenExpiredError) {
                    return res.status(401).json({ error: "Token expired" });
                } else if (err instanceof NotBeforeError) {
                    return res.status(401).json({ error: "Token not yet valid" });
                } else if (err instanceof JsonWebTokenError) {
                    return res.status(403).json({ error: 'Forbidden' });
                } else {
                    console.error(err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default new AuthMiddleware();
