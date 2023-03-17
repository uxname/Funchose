import { EvmPrivateKeyChecker } from '@/checkers/evm-private-key/evm-private-key.checker';
import { Detector } from '@/detector';

describe('Detector', () => {
  test('should return true if data is a valid EVM private key', async () => {
    const detector = new Detector([new EvmPrivateKeyChecker()]);
    const result = await detector.detect(
      'test 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test',
    );
    expect(result.triggeredCheckers.length).toBeGreaterThan(0);
    expect(result.processedValue).toBe(
      'test <EVM private replaced by Funchose> <EVM private replaced by Funchose> test',
    );
  });
});
