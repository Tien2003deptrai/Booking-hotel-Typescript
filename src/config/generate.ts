import jwt from 'jsonwebtoken';

export const generateTokenAccess = async (id: number) => {
    const token = jwt.sign(
        { id: id },
        process.env.SECRET_JWT,
        { expiresIn: '1h' },
    )
    return token;
}

export const generateTokenRefresh = async (id: number) => {
    const token = jwt.sign(
        { id: id },
        process.env.SECRET_JWT_REFRESH,
        {
            expiresIn: '30d'
        }
    )
    return token;
}
