import { BaseChecker } from '../../checkers/base/base.checker';
import { IFoundPart } from '../../checkers/base/i-base-checker';
export declare class EvmPrivateKeyChecker extends BaseChecker {
    name: () => string;
    priority: () => number;
    detect(data: string): Promise<Array<IFoundPart>>;
}
