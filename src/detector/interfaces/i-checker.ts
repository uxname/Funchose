export interface ICheckerResult {
  checkerName: string;
  trigger: boolean;
  reason?: string;
  processedValue?: string;
}

export interface IChecker {
  name: string;
  priority: number;
  containData: (data: string) => Promise<ICheckerResult>;
}