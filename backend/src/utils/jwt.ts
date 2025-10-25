import jwt from 'jsonwebtoken';
import { Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
}

// Generate Access Token
export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
};

// Generate Refresh Token
export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Verify Token
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
};

// Set Cookie with Token
export const setTokenCookie = (
  res: Response,
  name: string,
  token: string,
  maxAge: number = 7 * 24 * 60 * 60 * 1000 // 7 days
): void => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge,
    path: '/'
  });
};

// Clear Cookie
export const clearTokenCookie = (res: Response, name: string): void => {
  res.cookie(name, '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });
};

