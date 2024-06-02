import { JwtDecodedData } from './engine/types/jwt.types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtDecodedData & { userId: number; publicKey: string };
      worker?: JwtDecodedData & { workerId: number; publicKey: string };
    }
  }
}
