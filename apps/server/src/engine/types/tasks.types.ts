import z from 'zod';

export const create_tasks_input = z.object({
  title: z.string(),
  funds: z.number().default(0),
  description: z.string().nullable().default(null),
  signature: z.string(),
  worker: z.number().default(15),
});
