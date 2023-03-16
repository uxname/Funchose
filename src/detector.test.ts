import { EvmPrivateKeyChecker } from '@/checkers/evm-private-key/evm-private-key.checker';
import { Detector } from '@/detector';

describe('Detector', () => {
  test('should return true if data is a valid EVM private key', () => {
    const detector = new Detector([new EvmPrivateKeyChecker()]);
    expect(detector).toBeDefined();
  });
});
