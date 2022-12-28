//reference for following code was taked from classroom
import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizeHead: string | undefined = req.headers.authorization;
    const token: string = authorizeHead ? authorizeHead.split(' ')[1] : '';

    const decoded: string | object = jsonwebtoken.verify(
      token,
      process.env.TOKEN_SECRET || ''
    );
    next();
  } catch (err) {
    res.status(401);
    next("invalid token");
  }
};
export default verifyToken
