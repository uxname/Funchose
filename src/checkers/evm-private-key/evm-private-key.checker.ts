import {IChecker, ICheckerResult} from '@/interfaces/i-checker';

export class EvmPrivateKeyChecker implements IChecker {
    name: string;
    priority: number;

    containData(data: string): Promise<ICheckerResult> {
        return Promise.resolve({
            checkerName: this.name,
            processedValue: data,
            reason: 'reason',
            trigger: true,
        });
    }
}