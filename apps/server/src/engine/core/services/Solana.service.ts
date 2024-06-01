import { Injectable } from '@nestjs/common';

@Injectable()
export class SolanaService {
  public coin_modal = {
    base_minimum_workers: 15,
    base_task_fee: 15_00_000,
    per_image_option: 1_00_000,
    aditional_worker_fee: 50_000,
    commision_on_each_worker: 0.2,
  };
}
