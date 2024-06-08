import { Injectable } from '@nestjs/common';
import * as web3 from '@solana/web3.js';
import { OWNER_PRIVATE_KEY_ONCHAIN } from 'src/engine/utils/config/env.config';
import * as bs58 from 'bs58';

@Injectable()
export class SolanaService {
  private connection: web3.Connection;
  private payer: web3.Keypair;

  public coin_modal = {
    base_minimum_workers: 15,
    base_task_fee: 15_00_000,
    per_image_option: 1_00_000,
    aditional_worker_fee: 50_000,
    commision_on_each_worker: 0.2,
    worker_work_fee: 50_000,
  };

  constructor() {
    this.connection = new web3.Connection(
      web3.clusterApiUrl('devnet'),
      'confirmed',
    );
    const privateKey = bs58.decode(OWNER_PRIVATE_KEY_ONCHAIN);
    this.payer = web3.Keypair.fromSecretKey(privateKey);
  }

  public async sendLamportsOnChain(address: string, lamports: number) {
    const recipient = new web3.PublicKey(address);
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: this.payer.publicKey,
        toPubkey: recipient,
        lamports: lamports,
      }),
    );

    console.log(transaction);

    try {
      const signature = await web3.sendAndConfirmTransaction(
        this.connection,
        transaction,
        [this.payer],
      );
      return { signature, success: true, to: address };
    } catch (error) {
      console.error('Error sending lamports:', error);
      return { success: false, signature: null, to: address };
    }
  }
}
