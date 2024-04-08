import jwt from 'jsonwebtoken';

export const generateToken = async (admin_id: number) => {
    const token = jwt.sign(
        { admin_id: admin_id },
        process.env.SECRET_JWT,
        { expiresIn: '1h' },
    )
    return token;
}