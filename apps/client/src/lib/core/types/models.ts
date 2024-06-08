// Generated TypeScript interfaces based on the Prisma schema

export enum TaskStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}

export enum TransactionStatus {
  PROCESSING = "PROCESSING",
  REVOKED = "REVOKED",
  SUCCESS = "SUCCESS",
}

export enum TransactionType {
  WITHDRAW = "WITHDRAW",
  DEPOSIT = "DEPOSIT",
}

export interface User {
  id: number;
  name?: string | null;
  address: string;
  tasks?: Task[];
  createdAt: Date;
  Worker: Worker;
  workerId: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  options?: Option[];
  user: User;
  userId: number;
  funds: number;
  responses: number;
  responseLimit: number;
  submissions?: Submission[];
  status: TaskStatus;
  signature: string;
  worker: number;
  createdAt: Date;
  updatedAt: Date;
  endAt?: Date | null;
}

export interface Option {
  id: string;
  serial_no?: number | null;
  image_url: string;
  tasks: Task;
  taskId: number;
  submissions?: Submission[];
}

export interface Worker {
  id: number;
  name?: string | null;
  address: string;
  submissions?: Submission[];
  wallet?: Wallet | null;
  user?: User | null;
  createdAt: Date;
  updatedAt: Date;
  walletId?: string | null;
  userId?: number | null;
}

export interface Submission {
  id: string;
  option: Option;
  optionId: string;
  Worker: Worker;
  workerId: number;
  task: Task;
  taskId: number;
  amount_credited_to_worker: number;
  createdAt: Date;
  transaction?: Transaction;
  transactionId?: string;
}

export interface Wallet {
  id: number;
  worker?: Worker | null;
  workerId: number;
  currentAmount: number;
  lockedAmount: number;
  transactions?: Transaction[];

  // This unique constraint might not be required in TypeScript interface
  // @@unique([id, workerId])
}

export interface Transaction {
  id: string;
  address?: string | null;
  url?: string | null;
  description?: string | null;
  amount: number;
  Wallet: Wallet;
  walletId: number;
  from?: string | null;
  to?: string | null;
  status: TransactionStatus;
  transaction_type: TransactionType;
  createdAt: Date;
  Submission?: Submission | null;
  post_balance: number;
}

export interface OptionStatistics {
  option: Option;
  percentage: number;
  votes: number;
}

export interface TaskResult {
  task: Task;
  result: OptionStatistics[];
}

export interface SubmissionsByWorker {
  submissions: Submission[];
  submissionCountForDay: number;
  submissionTotalCount: number;
}

export const public_coin_modal = {
  base_minimum_workers: 15,
  base_task_fee: 15_00_000,
  per_image_option: 1_00_000,
  aditional_worker_fee: 50_000,
  commision_on_each_worker: 0.2,
  worker_work_fee: 50_000,
  sol: 1_000_000_000,
};
