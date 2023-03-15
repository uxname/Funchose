import {IChecker, ICheckerResult} from '@/interfaces/i-checker';

export class EvmPrivateKeyChecker implements IChecker {
    name: string;
    priority: number;

    async containData(data: string): Promise<ICheckerResult> {
        const regex = new RegExp(/(0x)?[0-9a-fA-F]{64}/);
        if (regex.test(data)) {
            return {
                checkerName: this.name,
                trigger: true,
                processedValue: data,
            };
        }
        return {
            checkerName: this.name,
            trigger: false,
        }
    }
}