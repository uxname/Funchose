import {
  IChecker,
  ICheckerResult,
  IDetectorResult,
} from './interfaces/i-checker';

export class Detector {
  checkers: IChecker[];

  constructor(checkers: IChecker[]) {
    this.checkers = checkers.sort((a, b) => a.priority() - b.priority());
  }

  async detect(data: string): Promise<IDetectorResult> {
    const result: IDetectorResult = {
      triggeredCheckers: [],
      processedValue: data,
    };

    for (const checker of this.checkers) {
      const checkerResult: ICheckerResult = await checker.processData(data);
      if (checkerResult.triggered) {
        result.triggeredCheckers.push(checkerResult);
        result.processedValue = checkerResult.valueOut;
      }
    }

    return result;
  }
}
