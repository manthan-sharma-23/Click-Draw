import { Option } from '@prisma/client';

export interface OptionStatistics {
  option: Option;
  percentage: number;
  votes: number;
}
