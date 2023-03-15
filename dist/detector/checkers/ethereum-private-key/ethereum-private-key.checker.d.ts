import { IChecker, ICheckerResult } from '../../../detector/interfaces/i-checker';
export declare class EthereumPrivateKeyChecker implements IChecker {
    name: string;
    priority: number;
    containData(data: string): Promise<ICheckerResult>;
}
