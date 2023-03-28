import { ICheckerInfo } from '../../interfaces/i-checker';
export interface IBaseChecker extends ICheckerInfo {
    detect(data: string): Promise<Array<IFoundPart>>;
    replace?: ((valueIn: string, foundParts: Array<IFoundPart>) => Promise<string>) | undefined;
}
export interface IFoundPart {
    value: string;
    positionStart: number;
    positionEnd: number;
}
