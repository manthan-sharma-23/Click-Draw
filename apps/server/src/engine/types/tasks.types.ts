import z from 'zod';

export const create_tasks_input = z.object({
  title: z.string(),
  description: z.string().nullable(),
  options: z.array(z.string()),
  funds: z.number().nullable(),
});
