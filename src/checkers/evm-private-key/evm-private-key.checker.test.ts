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
    const testDataOutput1 =
      'test <Sensitive data was removed by EVM private key checker> test';
    const result1 = await checker.processData(testDataInput1);
    expect(result1.valueOut).toEqual(testDataOutput1);
    expect(result1.triggered).toBe(true);

    const testDataInput2 =
      'test 10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test';
    const testDataOutput2 =
      'test <Sensitive data was removed by EVM private key checker> test';
    const result2 = await checker.processData(testDataInput2);
    expect(result2.valueOut).toEqual(testDataOutput2);
    expect(result2.triggered).toBe(true);
  });

  test('should filter multiple private keys', async () => {
    const testDataInput1 =
      'test 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test 0x20407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f';
    const testDataOutput1 =
      'test <Sensitive data was removed by EVM private key checker> test <Sensitive data was removed by EVM private key checker>';
    const result1 = await checker.processData(testDataInput1);
    expect(result1.valueOut).toEqual(testDataOutput1);
    expect(result1.triggered).toBe(true);
  });

  test('should not filter anything', async () => {
    const testDataInput1 = 'test 123 test';
    const testDataOutput1 = testDataInput1;
    const result1 = await checker.processData(testDataInput1);
    expect(result1.valueOut).toEqual(testDataOutput1);
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
      '0x29c7a764a1938474d4dc2d8ad888a7697d52f73c42305e74f1a45e7c53d6211c',
      '0x44c17a62a34a69279c721d9e9e33d1cf2b8f89931a2eefb0f92d5456880db77e',
      '0x9c0a59947f5a5c4446cbdbf788b50d6e590ef288c11e6c5b6f21fa9dc5d6b196',
      '0x1fc3e51fc59d05099d518f6358a48c2b1f521d450c208b95a8f9257c1d4e514e',
      '0xc4b3f9d857266d798e526aae2168a60c638b81aaddb1ee17b1e8ba28f1289b25',
      '0x6f8aa6fa7c0d928c1ec7ca2468a37cc64aa9d9dd2df2a38b8a2b2e1c117173b4',
      '0x4f3c9b4d61d4c297b44a1e3f51e3d55d29999b91345f48a2c1b4c4e97ad4af28',
      '0xe2c12efce33f364fd798d8c39a37f36d2e0d8e7a1f9816e09baa8343b6d9f6e9',
      '0x964e247db1c52d11ec37a24584b7f1e9c9cf7e790c79dfbdbf7bc1b46f050bbd',
      '0x5dd62f5b1d21b202a4c4a3f3c4e8f676b492eabf962c11b2a0d91c69386c89c4',
      '0xb331e18f4d219ad763c758ab8ff2af74b9d86fbfe1b5c5b5a26577e58a7f59d6',
      '0xc5b5d510b29a522f76ce51a985ca636dbbcb67d797066d940b76f7df1aa12d9c',
      '0x845c6b2e6fcf8a456d1b63578a3fa80ecaf13c8f618e9f90b47caed7f1e222b7',
      '0x49f1e5639c9d52eb7f03f6ed0e6b0008aa60af6846d1ee6c3f3fa9d6b663de6d',
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
