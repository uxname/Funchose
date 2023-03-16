import { IChecker, ICheckerResult } from '@/interfaces/i-checker';

export class EvmPrivateKeyChecker implements IChecker {
  name: string;
  priority: number;

  async containData(
    data: string,
    placeholder = '***',
  ): Promise<ICheckerResult> {
    const regex = new RegExp(/(0x)?[\dA-Fa-f]{64}/g);
    if (regex.test(data)) {
      return {
        checkerName: this.name,
        trigger: true,
        processedValue: data.replaceAll(regex, placeholder),
      };
    }
    return {
      checkerName: this.name,
      trigger: false,
    };
  }
}
