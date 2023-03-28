import {
  IChecker,
  ICheckerReplaceFunctionParameters,
  ICheckerResult,
  IPart,
} from '@/interfaces/i-checker';

export class EvmPrivateKeyChecker implements IChecker {
  name = 'EVM private key checker';
  priority = 1;

  constructor(
    replaceFunction?: (
      parameters: ICheckerReplaceFunctionParameters,
    ) => Promise<string>,
  ) {
    this.replaceFunction = this.replaceFunction || replaceFunction;
  }

  async processData(data: string): Promise<ICheckerResult> {
    const regex = new RegExp(/(0x)?[\dA-Fa-f]{64}/g);
    if (regex.test(data)) {
      const foundParts: IPart[] | undefined = data
        .match(regex)
        ?.map((value) => ({
          value,
        }));
      if (foundParts) {
        return {
          checkerName: this.name,
          triggered: true,
          processedValue: await this.replaceFunction({
            sourceValue: data,
            foundParts,
          }),
        };
      }
    }
    return {
      checkerName: this.name,
      triggered: false,
      processedValue: data,
    };
  }

  async replaceFunction(
    parameters: ICheckerReplaceFunctionParameters,
  ): Promise<string> {
    const PLACEHOLDER = `<Private key was removed by ${this.name}>`;

    let processedValue = parameters.sourceValue;
    for (const part of parameters.foundParts) {
      processedValue = processedValue.replace(part.value, PLACEHOLDER);
    }

    return processedValue;
  }
}
