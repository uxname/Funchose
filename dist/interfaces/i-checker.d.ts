export interface IChecker {
    priority: number;
    containData: (data: string) => Promise<boolean>;
}
