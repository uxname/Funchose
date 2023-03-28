// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/no-duplicate-string */
import { BaseChecker } from '@/checkers/base/base.checker';
import { IFoundPart } from '@/checkers/base/i-base-checker';

class TestChecker extends BaseChecker {
  name = () => 'Test checker';
  priority = () => 1;

  async detect(data: string): Promise<Array<IFoundPart>> {
    const SENSITIVE_DATA = 'secret';
    const foundParts: Array<IFoundPart> = [];

    let position = data.indexOf(SENSITIVE_DATA);
    while (position !== -1) {
      foundParts.push({
        value: SENSITIVE_DATA,
        positionStart: position,
        positionEnd: position + SENSITIVE_DATA.length,
      });
      position = data.indexOf(SENSITIVE_DATA, position + 1);
    }

    return foundParts;
  }
}

describe('Base checker', () => {
  let checker: BaseChecker;

  beforeAll(() => {
    checker = new TestChecker();
  });

  test('should replace text', async () => {
    const TEST_STR = '123secret456secret789';

    const foundParts = await checker.detect(TEST_STR);
    // eslint-disable-next-line no-magic-numbers
    expect(foundParts).toHaveLength(2);
    const result = await checker.processData(TEST_STR);

    expect(checker).toBeDefined();
    expect(result.triggered).toBeTruthy();
    expect(result.valueOut).not.toEqual(TEST_STR);
    expect(result.valueIn).toEqual(TEST_STR);
    expect(result.checkerName).toBe('Test checker');
  });

  test('should not replace text', async () => {
    const TEST_STR = '123456789';

    const foundParts = await checker.detect(TEST_STR);
    expect(foundParts).toHaveLength(0);
    const result = await checker.processData(TEST_STR);

    expect(checker).toBeDefined();
    expect(result.triggered).toBeFalsy();
    expect(result.valueOut).toEqual(TEST_STR);
    expect(result.valueIn).toEqual(TEST_STR);
    expect(result.checkerName).toBe('Test checker');
  });
});
