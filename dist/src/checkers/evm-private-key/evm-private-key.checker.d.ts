import { IChecker, ICheckerReplaceFunctionParameters, ICheckerResult } from '../../interfaces/i-checker';
export declare class EvmPrivateKeyChecker implements IChecker {
    name: string;
    priority: number;
    constructor(replaceFunction?: (parameters: ICheckerReplaceFunctionParameters) => Promise<string>);
    processData(data: string): Promise<ICheckerResult>;
    replaceFunction(parameters: ICheckerReplaceFunctionParameters): Promise<string>;
}
