import { NextFunction, Request, Response } from 'express';

export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
  const now = new Date();
  console.log(`${now} ${req.method} ${req.url}`);
  next();
}
