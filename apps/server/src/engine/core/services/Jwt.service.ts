import * as jwt from 'jsonwebtoken';
import { JwtDecodedData } from 'src/engine/types/jwt.types';

export class JwtService {
  decodeToken({ token }: { token: string; key?: string }): JwtDecodedData {
    const data = jwt.decode(token) as JwtDecodedData;

    return data;
  }
}
