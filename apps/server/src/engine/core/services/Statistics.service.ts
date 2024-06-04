import { Injectable } from '@nestjs/common';
import { Option, Submission, Task } from '@prisma/client';
import { OptionStatistics } from 'src/engine/types/app.wide.types';

@Injectable()
export class TaskStatisticsService {
  getEachOptionPercentage(
    task: Task & { options: Option[]; submissions: Submission[] },
  ) {
    const recordObj = {};
    task.options.forEach((option) => {
      recordObj[option.id] = { option, percentage: 0 };
    });

    task.submissions.forEach((submission) => {
      const record = recordObj[submission.optionId];
      const percent = record.percentage;

      recordObj[submission.optionId] = {
        ...record,
        percentage: ((percent + 1) / task.responses) * 100,
      };
    });

    const result = Object.values(recordObj) as OptionStatistics[];

    return result;
  }
}
