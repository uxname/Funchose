import { BaseChecker } from '@/checkers/base/base.checker';
import { IFoundPart } from '@/checkers/base/i-base-checker';

export class EvmPrivateKeyChecker extends BaseChecker {
  name = () => 'EVM private key checker';
  priority = () => 1;

  async detect(data: string): Promise<Array<IFoundPart>> {
    const regex = new RegExp(/(0x)?[\dA-Fa-f]{64}/g);
    if (regex.test(data)) {
      return (
        data.match(regex)?.map((value) => ({
          value,
          positionStart: data.indexOf(value),
          positionEnd: data.indexOf(value) + value.length,
        })) || []
      );
    }

    return [];
  }
}
