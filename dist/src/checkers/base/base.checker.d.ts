import { IBaseChecker, IFoundPart } from '../../checkers/base/i-base-checker';
import { IChecker, ICheckerReplaceFunctionParameters, ICheckerResult } from '../../interfaces/i-checker';
export declare abstract class BaseChecker implements IChecker, IBaseChecker {
    abstract name(): string;
    abstract priority(): number;
    abstract detect(data: string): Promise<Array<IFoundPart>>;
    replace?: ((valueIn: string, foundParts: Array<IFoundPart>) => Promise<string>) | undefined;
    constructor(replaceFunction?: (parameters: ICheckerReplaceFunctionParameters) => Promise<string>);
    processData(data: string): Promise<ICheckerResult>;
    replaceFunction(parameters: ICheckerReplaceFunctionParameters): Promise<string>;
}
