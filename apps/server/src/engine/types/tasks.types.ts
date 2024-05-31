import z from 'zod';

export const create_task_options_input = z.object({
  serial_no: z.number().nullable(),
  image_url: z.string(),
});

export const create_tasks_input = z.object({
  title: z.string(),
  description: z.string().nullable(),
  options: z.array(create_task_options_input),
  funds: z.number().nullable(),
});
