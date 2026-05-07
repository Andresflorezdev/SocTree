import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateJWT = (payload: JwtPayload) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET no configurada');
    }

    const token = jwt.sign(payload, secret, {
        expiresIn: '1d',
    });
    return token;
}