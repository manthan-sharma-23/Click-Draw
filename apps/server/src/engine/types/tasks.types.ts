import z from 'zod';

export const create_tasks_input = z.object({
  title: z.string(),
  description: z.string().nullable(),
  funds: z.number().default(0),
});
