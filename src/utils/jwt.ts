import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'changeme';

const signJwt = (data: object) => jwt.sign(data, SECRET);
const verifyJwt = <T>(token: string) => jwt.verify(token, SECRET) as T;

export { signJwt, verifyJwt };
