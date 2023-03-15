import { IChecker, ICheckerResult } from '@/detector/interfaces/i-checker';

export class EthereumPrivateKeyChecker implements IChecker {
  name: string;
  priority: number;

  containData(data: string): Promise<ICheckerResult> {
    return Promise.resolve({
      checkerName: this.name,
      processedValue: data,
      reason: 'reason',
      trigger: true,
    });
  }

}