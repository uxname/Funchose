import { IChecker, ICheckerResult } from './interfaces/i-checker';

export class Detector {
  checkers: IChecker[];

  constructor(checkers: IChecker[]) {
    this.checkers = checkers.sort((a, b) => a.priority - b.priority);
  }

  async detect(data: string): Promise<ICheckerResult> {
    const promiseArray = this.checkers.map((checker) => checker.containData(data));
    return Promise.any(promiseArray);
  }
}