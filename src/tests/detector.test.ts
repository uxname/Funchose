import { Detector } from '@/detector';
import { IChecker, ICheckerResult } from '@/detector/interfaces/i-checker';

const detector = new Detector([
  new class implements IChecker {
    name = 'checker1';

    priority = 1;

    containData(data: string): Promise<ICheckerResult> {
      return Promise.resolve({
        checkerName: this.name,
        processedValue: data,
        reason: 'reason',
        trigger: true,
      });
    }
  },
]);

async function main() {
  const data = 'data';
  const time = performance.now();
  const result = await detector.detect(data);
  console.log('time', performance.now() - time);

  console.log('result', result);
}

main().catch(console.error);