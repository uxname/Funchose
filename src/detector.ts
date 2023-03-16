import {
  IChecker,
  ICheckerResult,
  IDetectorResult,
} from './interfaces/i-checker';

export class Detector {
  checkers: IChecker[];

  constructor(checkers: IChecker[]) {
    this.checkers = checkers.sort((a, b) => a.priority - b.priority);
  }

  async detect(data: string): Promise<IDetectorResult> {
    const result: IDetectorResult = {
      triggeredCheckers: [],
      processedValue: data,
    };

    for (const checker of this.checkers) {
      const checkerResult: ICheckerResult = await checker.containData(data);
      if (checkerResult.trigger) {
        result.triggeredCheckers.push(checkerResult);
        result.processedValue = checkerResult.processedValue;
      }
    }

    return result;
  }
}
