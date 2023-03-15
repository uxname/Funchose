import { IChecker, ICheckerResult } from './interfaces/i-checker';
export declare class Detector {
    checkers: IChecker[];
    constructor(checkers: IChecker[]);
    detect(data: string): Promise<ICheckerResult>;
}
