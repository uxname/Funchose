import { EvmPrivateKeyChecker } from '@/checkers/evm-private-key/evm-private-key.checker';

describe('EVM checker', () => {
  let checker: EvmPrivateKeyChecker;

  beforeAll(() => {
    checker = new EvmPrivateKeyChecker('<EVM private replaced by Funchose>');
  });

  test('should filter one private key', async () => {
    const testDataInput1 =
      'test 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test';
    const testDataOutput1 = 'test *** test';
    const result1 = await checker.containData(testDataInput1);
    expect(result1.processedValue).toEqual(testDataOutput1);
    expect(result1.trigger).toBe(true);

    const testDataInput2 =
      'test 10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test';
    const testDataOutput2 = 'test *** test';
    const result2 = await checker.containData(testDataInput2);
    expect(result2.processedValue).toEqual(testDataOutput2);
    expect(result2.trigger).toBe(true);
  });

  test('should filter multiple private keys', async () => {
    const testDataInput1 =
      'test 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f';
    const testDataOutput1 = 'test *** test ***';
    const result1 = await checker.containData(testDataInput1);
    expect(result1.processedValue).toEqual(testDataOutput1);
    expect(result1.trigger).toBe(true);
  });
});
