// eslint-disable-next-line unicorn/prevent-abbreviations
import { IFoundPart } from '@/checkers/base/i-base-checker';

export interface ICheckerResult {
  checkerName: string;
  triggered: boolean;

  valueIn: string;
  valueOut: string;
}

export interface IDetectorResult {
  triggeredCheckers: ICheckerResult[];
  processedValue: string;
}

export interface ICheckerReplaceFunctionParameters {
  sourceValue: string;
  foundParts: IFoundPart[];
}

export interface ICheckerInfo {
  name: () => string;
  priority: () => number;
}

export interface IChecker extends ICheckerInfo {
  replaceFunction?: (
    parameters: ICheckerReplaceFunctionParameters,
  ) => Promise<string>;
  processData: (data: string) => Promise<ICheckerResult>;
}
