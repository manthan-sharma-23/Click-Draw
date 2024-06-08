import z from 'zod';

export const create_tasks_input = z.object({
  title: z.string(),
  funds: z.number().default(0),
  description: z.string().nullable().default(null).optional(),
  signature: z.string(),
  worker: z.number().default(15).optional(),
  endAt: z.date().optional(),
  useWallet: z.boolean().default(false).optional(),
});

export const get_submission_by_id_input = z.object({
  submissionId: z.string(),
});

export const get_task_results_input = z.object({
  taskId: z.number(),
});
