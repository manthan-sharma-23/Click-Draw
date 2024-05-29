// index.d.ts

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { userId: string };
    }
  }
}

export interface UserJwtPayload extends JwtPayload {
  userId: string;
}
