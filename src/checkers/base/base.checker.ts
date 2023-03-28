import { IBaseChecker, IFoundPart } from '@/checkers/base/i-base-checker';
import {
  IChecker,
  ICheckerReplaceFunctionParameters,
  ICheckerResult,
} from '@/interfaces/i-checker';

export abstract class BaseChecker implements IChecker, IBaseChecker {
  abstract name(): string;
  abstract priority(): number;

  abstract detect(data: string): Promise<Array<IFoundPart>>;
  replace?:
    | ((valueIn: string, foundParts: Array<IFoundPart>) => Promise<string>)
    | undefined;

  constructor(
    replaceFunction?: (
      parameters: ICheckerReplaceFunctionParameters,
    ) => Promise<string>,
  ) {
    this.replaceFunction = this.replaceFunction || replaceFunction;
  }

  async processData(data: string): Promise<ICheckerResult> {
    const detectedItems = await this.detect(data);

    if (detectedItems.length === 0) {
      return {
        checkerName: this.name(),
        triggered: false,
        valueOut: data,
        valueIn: data,
      };
    }

    const valueOut = await this.replaceFunction({
      sourceValue: data,
      foundParts: detectedItems,
    });

    return {
      valueIn: data,
      checkerName: this.name(),
      triggered: valueOut !== data,
      valueOut,
    };
  }

  async replaceFunction(
    parameters: ICheckerReplaceFunctionParameters,
  ): Promise<string> {
    if (this.replace) {
      return this.replace(parameters.sourceValue, parameters.foundParts);
    }

    const PLACEHOLDER = `<Sensitive data was removed by ${this.name()}>`;

    let replacedData = parameters.sourceValue;
    let offset = 0;

    for (const foundPart of parameters.foundParts) {
      const { positionStart, positionEnd } = foundPart;
      const foundStringLength = positionEnd - positionStart;
      const replacedStringLength = PLACEHOLDER.length;

      const newStart = positionStart + offset;
      const beforeString = replacedData.slice(0, newStart);
      const afterString = replacedData.slice(newStart + foundStringLength);

      replacedData = beforeString + PLACEHOLDER + afterString;
      offset += replacedStringLength - foundStringLength;
    }

    return replacedData;
  }
}
