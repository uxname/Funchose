// eslint-disable-next-line unicorn/prevent-abbreviations
export interface ICheckerResult {
  checkerName: string;
  triggered: boolean;
  reason?: string;
  processedValue: string;
}

export interface IDetectorResult {
  triggeredCheckers: ICheckerResult[];
  processedValue: string;
}

export interface IPart {
  value: string;
}

export interface ICheckerReplaceFunctionParameters {
  sourceValue: string;
  foundParts: IPart[];
}

export interface IChecker {
  name: string;
  priority: number;
  replaceFunction: (
    parameters: ICheckerReplaceFunctionParameters,
  ) => Promise<string>;
  processData: (data: string) => Promise<ICheckerResult>;
}
