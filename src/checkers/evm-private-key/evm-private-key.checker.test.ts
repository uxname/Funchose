import { EvmPrivateKeyChecker } from '@/checkers/evm-private-key/evm-private-key.checker';

function generateEthereumPrivateKeys(numberKeys: number): string[] {
  const keys: string[] = [];
  const characters = 'abcdef0123456789';
  const keyLength = 64;

  for (let index = 0; index < numberKeys; index++) {
    let key = '';
    for (let index_ = 0; index_ < keyLength; index_++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      // eslint-disable-next-line security/detect-object-injection
      key += characters[randomIndex];
    }
    keys.push(key);
  }

  return keys;
}

function generateEthereumPrivateKeysWithPrefix(numberKeys: number): string[] {
  const keys = generateEthereumPrivateKeys(numberKeys);
  return keys.map((key) => `0x${key}`);
}

function generateRandomStrings(numberKeys: number): string[] {
  const keys: string[] = [];
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const keyLength = 100;

  for (let index = 0; index < numberKeys; index++) {
    keys.push(
      Array.from({ length: keyLength }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length)),
      ).join(''),
    );
  }

  return keys;
}

describe('EVM checker', () => {
  let checker: EvmPrivateKeyChecker;

  beforeAll(() => {
    checker = new EvmPrivateKeyChecker();
  });

  test('should filter one private key', async () => {
    const testDataInput1 =
      'test 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test';
    const testDataOutput1 = 'test <Private_key_removed_by_Funchose> test';
    const result1 = await checker.processData(testDataInput1);
    expect(result1.processedValue).toEqual(testDataOutput1);
    expect(result1.triggered).toBe(true);

    const testDataInput2 =
      'test 10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test';
    const testDataOutput2 = 'test <Private_key_removed_by_Funchose> test';
    const result2 = await checker.processData(testDataInput2);
    expect(result2.processedValue).toEqual(testDataOutput2);
    expect(result2.triggered).toBe(true);
  });

  test('should filter multiple private keys', async () => {
    const testDataInput1 =
      'test 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test 0x20407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f';
    const testDataOutput1 =
      'test <Private_key_removed_by_Funchose> test <Private_key_removed_by_Funchose>';
    const result1 = await checker.processData(testDataInput1);
    expect(result1.processedValue).toEqual(testDataOutput1);
    expect(result1.triggered).toBe(true);
  });

  test('should not filter anything', async () => {
    const testDataInput1 = 'test 123 test';
    const testDataOutput1 = testDataInput1;
    const result1 = await checker.processData(testDataInput1);
    expect(result1.processedValue).toEqual(testDataOutput1);
    expect(result1.triggered).toBe(false);
  });

  test('should filter many strings', async () => {
    const CONST_NUMBER_OF_TESTS = 1000;
    const testDataA = generateEthereumPrivateKeys(CONST_NUMBER_OF_TESTS);
    const testDataB = generateEthereumPrivateKeysWithPrefix(
      CONST_NUMBER_OF_TESTS,
    );
    const testData = [
      ...testDataA,
      ...testDataB,
      'test0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f',
      'test10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1ftest',
    ];
    let triggeredCount = 0;

    for (const testDatum of testData) {
      const result = await checker.processData(testDatum);
      if (result.triggered) {
        triggeredCount++;
      }
    }

    expect(triggeredCount).toEqual(testData.length);
  });

  test('should not filter many strings with other strings', async () => {
    const CONST_NUMBER_OF_TESTS = 1000;

    const testData = generateRandomStrings(CONST_NUMBER_OF_TESTS);

    let triggeredCount = 0;

    for (const testDatum of testData) {
      const result = await checker.processData(testDatum);
      if (result.triggered) {
        triggeredCount++;
      }
    }

    expect(triggeredCount).toBe(0);
  });
});
