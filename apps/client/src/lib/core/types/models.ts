export interface User {
  id: number;
  name?: string | null;
  address: string;
  tasks: Task[];
}

// TaskStatus enum interface
export enum TaskStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}

// Task model interface
export interface Task {
  id: number;
  title: string;
  description?: string | null;
  options: Option[];
  user: User;
  userId: number;
  funds: number;
  responses: number;
  responseLimit: number;
  Submissions: Submission[];
  status: TaskStatus;
  signature: string;
  worker: number;
  createdAt: Date;
  updatedAt: Date;
}

// Option model interface
export interface Option {
  id: string;
  serial_no?: number | null;
  image_url: string;
  tasks: Task;
  taskId: number;
  submissions: Submission[];
}

// Worker model interface
export interface Worker {
  id: number;
  name?: string | null;
  address: string;
  submissions: Submission[];
}

// Submissions model interface
export interface Submission {
  id: string;
  option: Option;
  optionId: string;
  Worker: Worker;
  workerId: number;
  task: Task;
  taskId: number;
}
