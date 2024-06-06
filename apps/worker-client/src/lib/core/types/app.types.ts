// TypeScript interfaces for Prisma schema models

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
  name?: string;
  address: string;
  tasks: Task[];
  createdAt: Date;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  options: Option[];
  user: User;
  userId: number;
  funds: number;
  responses: number;
  responseLimit: number;
  submissions: Submission[];
  status: TaskStatus;
  signature: string;
  worker: number;
  createdAt: Date;
  updatedAt: Date;
  endAt?: Date;
}

export interface Option {
  id: string;
  serial_no?: number;
  image_url: string;
  tasks: Task;
  taskId: number;
  submissions: Submission[];
}

export interface Worker {
  id: number;
  name?: string;
  address: string;
  submissions: Submission[];
  wallet?: Wallet;
  createdAt: Date;
  updatedAt: Date;
  walletId?: string;
}

export interface Submission {
  id: string;
  option: Option;
  optionId: string;
  worker: Worker;
  workerId: number;
  task: Task;
  taskId: number;
  amount_credited_to_worker: number;
  createdAt: Date;
}

export interface Wallet {
  id: number;
  worker?: Worker;
  workerId: number;
  currentAmount: number;
  lockedAmount: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  address?: string;
  url?: string;
  description?: string;
  amount: number;
  wallet: Wallet;
  walletId: number;
  from?: string;
  to?: string;
  status: TransactionStatus;
  transaction_type: TransactionType;
  createdAt: Date;
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
