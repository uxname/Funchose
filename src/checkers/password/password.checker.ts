import {
  IChecker,
  ICheckerReplaceFunctionParameters,
  ICheckerResult,
} from '@/interfaces/i-checker';

export class PasswordChecker implements IChecker {
  name = 'Password checker';
  priority = 1;

  constructor(
    replaceFunction?: (
      parameters: ICheckerReplaceFunctionParameters,
    ) => Promise<string>,
  ) {
    this.replaceFunction = this.replaceFunction || replaceFunction;
  }

  async processData(data: string): Promise<ICheckerResult> {
    if (data.toLowerCase().includes('password')) {
      return {
        checkerName: this.name,
        triggered: true,
        processedValue: await this.replaceFunction({
          sourceValue: data,
          foundParts: [],
        }),
      };
    }
    return {
      checkerName: this.name,
      triggered: false,
      processedValue: data,
    };
  }

  async replaceFunction(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parameters: ICheckerReplaceFunctionParameters,
  ): Promise<string> {
    return `<String with password was removed by ${this.name}>`;
  }
}
